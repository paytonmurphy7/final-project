CREATE TABLE IF NOT EXISTS personalities (
  id BIGSERIAL PRIMARY KEY,
  owner_id BIGINT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS animes (
  id BIGSERIAL PRIMARY KEY,
  owner_id BIGINT NOT NULL,
  title TEXT NOT NULL,
  genre TEXT,
  release_year BIGINT,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS characters (
  id BIGSERIAL PRIMARY KEY,
  owner_id BIGINT NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT,
  anime BIGINT NOT NULL,
  personality BIGINT NOT NULL,
  description TEXT,
  age BIGINT,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (anime) REFERENCES animes(id),
  FOREIGN KEY (personality) REFERENCES personalities(id)
);
