FROM python:3.11-slim-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Debian Packages
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    build-essential \
    g++ \
    gcc \
    python3-dev \
    python3-dev \
    python3-distutils \
    vim iputils-ping wget telnet curl procps \
    git \
    && python3 -m pip install --upgrade pip \
    && pip install --upgrade pip setuptools wheel

# Install Python requirements
COPY requirements.txt requirements.txt
RUN --mount=type=cache,target=/root/.cache \
    pip install -r requirements.txt

COPY . /app

RUN chown -R root /app

CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]
