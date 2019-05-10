# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

#ChatSpace-DB設計

##必要なテーブルリスト

* usersテーブル:ユーザー登録で記入されたユーザー情報を保存する場所

* groupsテーブル:ユーザーが作成したチャットルームの情報を保存する場所

* messagesテーブル:誰がどのようなコメントをしたのかを保存する場所

* membersテーブル:groupテーブルとusersテーブルの中間テーブル

---------------------------------------------------------------

## usersテーブル
|Column|Type|Options|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false, unipue: true|

### Association
has_many :groups ,through: :members
has_many :members
has_many :massages

---------------------------------------------------------------

## groupsテーブル
|Column|Type|Options|
|name|string|null: false, unique: true|

### Association
has_many :users, through: :members
has_many :members
has_many :messages

---------------------------------------------------------------

### messagesテーブル
|Column|Type|Options|
|body|text||
|image|string||
|group_id|references|foreign_key: true null: false|
|user_id|references|foreign_key: true null: false|

### Association
belongs_to :user
belongs_to :group

---------------------------------------------------------------

### membersテーブル
|Column|Type|Options|
|group_id|references|index: true, foreign_key: true, null: false|
|user_id|references|index: true, foreign_key: true, null: false|

## Association
belongs_to :group
belongs_to :user

---------------------------------------------------------------
