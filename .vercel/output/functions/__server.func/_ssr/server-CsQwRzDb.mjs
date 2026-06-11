import { a as createStartHandler, d as defaultStreamHandler, T as TSS_SERVER_FUNCTION, b as createServerFn } from "./index.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const server = createStartHandler(defaultStreamHandler);
const createNewUserAction_createServerFn_handler = createServerRpc({
  id: "eea8802047078d2d3842d233deba1e3fb2d588531fe9179fa2fd2c6b215959a1",
  name: "createNewUserAction",
  filename: "src/server.ts"
}, (opts) => createNewUserAction.__executeServer(opts));
const createNewUserAction = createServerFn({
  method: "POST"
}).validator((data) => data).handler(createNewUserAction_createServerFn_handler, async ({
  data
}) => {
  const supabaseAdmin = createClient(process.env.VITE_SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "", {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  const {
    data: authUser,
    error: authError
  } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    // Aprova automaticamente para login imediato
    user_metadata: {
      role: data.role
    }
  });
  if (authError) {
    throw new Error(authError.message);
  }
  if (authUser?.user) {
    const {
      error: profileError
    } = await supabaseAdmin.from("profiles").insert([{
      id: authUser.user.id,
      email: data.email,
      role: data.role
    }]);
    if (profileError) {
      console.error("Erro ao registrar permissão na tabela:", profileError.message);
    }
  }
  return {
    success: true,
    userId: authUser.user.id
  };
});
export {
  createNewUserAction_createServerFn_handler,
  server as default
};
