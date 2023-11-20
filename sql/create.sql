CREATE TABLE IF NOT EXISTS todo ( id SERIAL PRIMARY KEY,
                                                    description TEXT NOT NULL,
                                                                     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                                           updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

-- Add a trigger to update updated_at on every update

CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_todo_updated_at
BEFORE
UPDATE ON todo
FOR EACH ROW EXECUTE FUNCTION update_updated_at();