CREATE TABLE IF NOT EXISTS 'todo'
    ('id' int(11) NOT NULL AUTO_INCREMENT,
                           'description' text NOT NULL,
                                              'created_at' datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                     'updated_at' datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                                                                                                                                        PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT
CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

