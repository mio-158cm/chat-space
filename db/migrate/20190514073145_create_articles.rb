class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
      t.string :name,               null: false, unique: true, index: true
      t.string :title
      t.string :author
      t.text :body
      t.timestamps
    end
  end
end
