# Enterprise AI Security Red Teaming Platform

## Prerequisites

- Python 3.8+
- PostgreSQL
- Redis
- Ollama (optional, for local models)

## Installation

### 1. Install System Dependencies

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip curl postgresql postgresql-contrib redis-server

# Start services
sudo systemctl start postgresql
sudo systemctl start redis
```

### 2. Set Up Database

```bash
# Create database user and database
sudo -u postgres psql

# Inside psql, run:
CREATE USER ai_security_user WITH PASSWORD 'your_password_here';
CREATE DATABASE ai_security_db OWNER ai_security_user;
GRANT ALL PRIVILEGES ON DATABASE ai_security_db TO ai_security_user;
\q
```

### 3. Set Up the Application

```bash
# Navigate to backend directory
cd backend

# Install uv (if not installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create virtual environment
uv venv
source .venv/bin/activate

# Install dependencies
uv pip install -r requirements.txt
uv pip install psycopg2-binary
```

### 4. Configure Environment

```bash
# Copy .env.example to .env and edit with your values
cp .env.example .env
nano .env
```

### 5. Initialize Database

```bash
python -c "from app.models.database import init_db; init_db()"

python -c "
from app.models.database import get_session_local, init_db
from app.seed_data import seed_attack_scenarios
init_db()
SessionLocal = get_session_local()
db = SessionLocal()
seed_attack_scenarios(db)
"
```

### 6. Install Ollama (Optional)

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull llama3
```

### 7. Run the Application

```bash
# Activate virtual environment
source .venv/bin/activate

# Start the server
uvicorn app.main:app --port 8000
```

## Access

- **Frontend**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs

## Configuration

Edit `.env` file with your credentials:

```
DATABASE_URL=postgresql://ai_security_user:your_password_here@localhost:5432/ai_security_db
REDIS_URL=redis://localhost:6379/0

# API Keys (get from respective provider dashboards)
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_API_KEY=your-google-api-key
```

## Supported Models

- **OpenAI**: GPT-4, GPT-4 Turbo
- **Anthropic**: Claude 3 Opus, Claude 3 Sonnet, Claude 3.5 Sonnet
- **Google**: Gemini 2.0 Flash, Gemini 2.5 Flash
- **Ollama**: Llama3, Mistral, CodeLlama (local)
