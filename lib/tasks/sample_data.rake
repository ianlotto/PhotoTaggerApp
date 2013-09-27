namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    15.times do |n|
      username  = Faker::Name.name
      password  = "password"
      User.create!(username: username,
                   password: password)
    end
  end
end