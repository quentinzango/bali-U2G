import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const accounts = [
    { email: "admin1@universdegadgets.cm", password: "Admin1@2025", name: "Admin1" },
    { email: "admin2@universdegadgets.cm", password: "Admin2@2025", name: "Admin2" },
    { email: "admin3@universdegadgets.cm", password: "Admin3@2025", name: "Admin3" },
    { email: "admin4@universdegadgets.cm", password: "Admin4@2025", name: "Admin4" },
    { email: "admin5@universdegadgets.cm", password: "Admin5@2025", name: "Admin5" },
  ];

  const results = [];

  for (const account of accounts) {
    // Create user
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: account.email,
      password: account.password,
      email_confirm: true,
      user_metadata: { display_name: account.name },
    });

    if (userError) {
      results.push({ email: account.email, error: userError.message });
      continue;
    }

    // Assign admin role
    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: userData.user.id,
      role: "admin",
    });

    results.push({
      email: account.email,
      name: account.name,
      success: !roleError,
      roleError: roleError?.message,
    });
  }

  return new Response(JSON.stringify({ results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
