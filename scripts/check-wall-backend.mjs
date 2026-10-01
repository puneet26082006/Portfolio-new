import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd());
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) {
  console.log("Supabase public settings are missing.");
  process.exitCode = 1;
} else {
  try {
    const response = await fetch(
      new URL("/rest/v1/rpc/wall_api_version", url),
      {
        method: "POST",
        headers: { apikey: key, "Content-Type": "application/json" },
        body: "{}",
        signal: AbortSignal.timeout(15000),
      },
    );
    const data = await response.json();
    if (response.ok && data === 3)
      console.log(
        "Wall backend version 3 is ready: instant pins and drawing studio supported.",
      );
    else {
      console.log(
        JSON.stringify({
          ready: false,
          status: response.status,
          code: data.code ?? null,
          action:
            "Run supabase/migrations/202610010002_wall_instant_pins.sql in this project’s SQL Editor.",
        }),
      );
      process.exitCode = 1;
    }
  } catch {
    console.log(
      "Could not reach the wall backend. Check connectivity and the project URL.",
    );
    process.exitCode = 1;
  }
}
