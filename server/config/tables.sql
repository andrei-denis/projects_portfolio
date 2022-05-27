-- user table
CREATE TABLE pp_user(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL
)

CREATE TABLE pp_project(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image VARCHAR(256),
    description VARCHAR(300),
    link VARCHAR (256),
    start_date DATE,
    end_date DATE,
    id_user INT(6) UNSIGNED,
    FOREIGN KEY(id_user) REFERENCES pp_user(id)
)

CREATE TABLE pp_category(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
    image VARCHAR(256)
)

CREATE TABLE pp_category_project(
	id_project INT(6) UNSIGNED,
    id_category INT(6) UNSIGNED,
    FOREIGN KEY(id_project) REFERENCES pp_project(id),
    FOREIGN KEY(id_category) REFERENCES pp_category(id)
)

-- queries:
SELECT pp_project.id, pp_project.title, pp_project.image, pp_project.description, pp_project.link, pp_project.start_date, pp_project.end_date, 
	pp_user.name AS creator 
FROM `pp_project` 
    INNER JOIN pp_user ON pp_user.id=pp_project.id_user
    INNER JOIN pp_category_project ON pp_project.id=pp_category_project.id_project
    INNER JOIN pp_category ON pp_category_project.id_category=pp_category.id

SELECT pp_project.id, pp_project.title, pp_project.image, pp_project.description,
     pp_project.link, pp_user.name AS creator 
FROM `pp_project` 
    INNER JOIN pp_user ON pp_user.id=pp_project.id_user 
WHERE pp_user.id = ?