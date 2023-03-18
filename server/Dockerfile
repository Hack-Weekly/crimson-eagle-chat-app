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

# Shell tweaks
RUN echo 'export PS1='$PS1 >> /root/.bashrc \
    && echo "alias pm='python manage.py'" >> /root/.bashrc \
    && echo "alias pmsh='python manage.py shell -i python'" >> /root/.bashrc \
    && echo "alias pmshb='python manage.py shell -i bpython'" >> /root/.bashrc \
    && echo "alias pmshi='python manage.py shell -i ipython'" >> /root/.bashrc \
    && echo "alias pmmk='python manage.py makemigrations'" >> /root/.bashrc \
    && echo "alias pmml='python manage.py makemigrations && python manage.py migrate'" >> /root/.bashrc \
    && echo "alias pmmi='python manage.py migrate'" >> /root/.bashrc

COPY . /app

CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]
