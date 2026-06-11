import { createServerFn } from "@tanstack/start";
import { createClient } from "@supabase/supabase-js";

interface CreateUserParams {
  email: string;
  password: string;
  role: "admin" | "operador";
}

export const createNewUserAction = createServerFn({ method: "POST" })
  .validator((data: CreateUserParams) => data)
  .handler(async ({ data }) => {
    // Inicializa o cliente administrativo apenas no servidor
    const supabaseAdmin = createClient(
      process.env.VITE_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // 1. Cria o usuário no sistema de autenticação
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true, // Aprova automaticamente para login imediato
      user_metadata: { role: data.role },
    });

    if (authError) {
      throw new Error(authError.message);
    }

    // 2. (Opcional) Salva o nível de acesso na tabela 'profiles' do banco de dados
    if (authUser?.user) {
      const { error: profileError } = await supabaseAdmin
        .from("profiles") // Se sua tabela tiver outro nome (ex: usuarios), altere aqui
        .insert([
          {
            id: authUser.user.id,
            email: data.email,
            role: data.role,
          },
        ]);

      if (profileError) {
        console.error("Erro ao registrar permissão na tabela:", profileError.message);
      }
    }

    return { success: true, userId: authUser.user.id };
  });
