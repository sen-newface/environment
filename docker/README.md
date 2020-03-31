# Docker環境構築

## Dockerにアクセスするための設定を追加
`/etc/hosts` に下記情報を記入
ここでパスワードを聞かれたら自身のPCに設定されたパスワードを入力してください。

```sh
sudo vi /etc/hosts
```

↓の情報を記述
```
#sen-newface
127.0.0.1 localapp.jp
127.0.0.1 ethnam.localapp.jp
127.0.0.1 laravel.localapp.jp
127.0.0.1 yeahcheese.localapp.jp
127.0.0.1 plane.localapp.jp
```
## 実習環境実行用のディレクトリ作成
```sh
mkdir -p ~/sen-newface
```

## git clone
```sh
cd ~/sen-newface
git clone git@github.com:sen-newface/environment.git
```

## ECRへログイン
```sh
aws ecr get-login --no-include-email |bash -
```

## Docker用のenvをコピー
```sh
cd environment/docker
cp .env.sample .env
```

## Dockerを起動
```sh
docker-compose up -d
```

## `*.localapp.jp` のオレオレ証明書をインストール

```
security add-trusted-cert -r trustRoot -k ~/Library/Keychains/login.keychain ./nginx/ssl/server.crt
```

# Mac起動後に開発環境起動
1度環境構築をすると、dockerを起動するだけで大丈夫です
```sh
cd ~/sen-newface/environment/docker
docker-compose up -d
```

# 各種環境へのリンク
- Laravel研修環境
  - https://laravel.localapp.jp
- Ethnam研修環境
  - https://ethnam.localapp.jp
- 生PHP実行環境
  - https://plane.localapp.jp
- 最終研修課題実行環境
  - https://yeahcheese.localapp.jp
