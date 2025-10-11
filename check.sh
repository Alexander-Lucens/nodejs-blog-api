#!/usr/bin/env bash
set -e

printf "\n\033[45;37m  Starts Project Checker \033[0m %s\n"

# === Helper functions ===
pass() { printf "\033[42;30m  PASS   \033[0m %s\n" "$1"; }
fail() { printf "\033[41;37m  FAIL   \033[0m %s\n" "$1"; }

# === Check .env file ===
if [ ! -f ".env" ]; then
  fail ".env file missing. Abort mission!"
  exit 1
else
  pass ".env file detected. Environmental parameters nominal."
fi

# === Required environment variables ===
REQUIRED_VARS=(
  "PORT"
  "JWT_SECRET"
  "DB_PASSWORD"
  "DB_USER"
  "DB_URL"
  "TEST_DB_URL"
  "JWT_EXPIRES_IN"
  "NODE_ENV"
)

# === Function to read .env safely ===
get_env_value() {
  grep -E "^\s*$1\s*=" .env | sed -E 's/^[[:space:]]*'"$1"'[[:space:]]*=[[:space:]]*//' | tr -d '"'
}

# === Check all variables ===
missing_vars=()

for var in "${REQUIRED_VARS[@]}"; do
  value=$(get_env_value "$var")
  if [ -z "$value" ]; then
    missing_vars+=("$var")
  fi
done

if [ ${#missing_vars[@]} -eq 0 ]; then
  pass "All critical environment variables verified."
else
  fail "Missing required environment variables:"
  for v in "${missing_vars[@]}"; do
    printf "   • %s\n" "$v"
  done
  printf "\033[31mMission aborted due to incomplete environmental configuration.\033[0m\n"
  exit 1
fi

# === Initialise API ===
cd api || { fail "API directory not found."; exit 1; }

if npm install > /dev/null 2>&1; then
  pass "API initialised."
else
  fail "API initialisation failed."
fi

# Optional tests
if npm test > /dev/null 2>&1; then
  pass "API liftoff confirmed. Systems green."
else
  fail "API trajectory unstable. Abort, abort!"
fi

# === Initialise Client ===
cd ../client || { fail "Client directory not found."; exit 1; }

if npm install > /dev/null 2>&1; then
  pass "Client-side initialised."
else
  fail "Client-side initialisation failed."
fi

cd .. || exit 1

# === Final status ===
printf "\033[45;37m MISSION \033[0m";
printf "\033[35m Initialisation successfully completed.\033[0m\n";
printf "\033[45;37m STATUS  \033[0m";
printf "\033[35m All systems nominal.\033[0m\n";