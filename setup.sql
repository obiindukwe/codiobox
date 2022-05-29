 
-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

DROP TABLE IF EXISTS parcel;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL
);

INSERT INTO accounts(user, pass)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");
INSERT INTO accounts(user, pass)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");

  INSERT INTO accounts(user, pass)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");



CREATE TABLE IF NOT EXISTS parcel(
    id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sender_postcode VARCHAR(100) NOT NULL,
    dest_postcode VARCHAR(100) NOT NULL,
    weight INT UNSIGNED,
    recipient VARCHAR(255),
    address TEXT,
    user_name VARCHAR(255),
    parcel_status VARCHAR(100) DEFAULT 'not-dispatched',
    tracking_number VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    uudid VARCHAR(100) 
  );


  CREATE TABLE t1 (   'uuid_field' VARCHAR(32) DEFAULT (uuid());
The name of the book.
The primary author.
The ISBN-13 number.
The Dewey Classification number.
The quantity to add as a slider with a range of 1-10.
A dropdown list to pick the loan period (how long the book can be borrowed for) in days. This should give options of 24 hours, 2 days, 1 week, 2 weeks and a month with the default option being 1 week.

CREATE TABLE t1 (
    uuid_field     VARCHAR(40) DEFAULT (uuid())
);

INSERT INTO student(student_id, first_name, isbn, dcn, quantity)
VALUES((UUID()),'john ', 150, 123454, 10),
      ((UUID()),'adam', 500, 456787, 10),
      ((UUID()),'david', 4590, 567890, 20);


      INSERT INTO parcel(sender_postcode, dest_postcode, weight, recipient, address, user_name, parcel_status, tracking_number )
      VALUES( 'D4BSU', 'B599Y', 0, "JOHN MARC", " 15 THE BOULEVARD", "chuck bass", " ", " "),
      ('k68US', 'B57SE', 0, "MARK", "GWARINPA ABUJA", "nathan chuks", " ", " ");
     

     ALTER TABLE parcel 
ALTER COLUMN address VARCHAR(100);



ALTER TABLE parcel
ADD COLUMN user_name VARCHAR(100) AFTER address ;

ALTER TABLE parcel
ADD COLUMN tracking_number VARCHAR(100) DEFAULT (UUID()) AFTER parce_status;


ALTER TABLE parcel
ADD tracking_number VARCHAR(225) NOT NULL
DEFAULT uuid();

function display(err, message) {
  if(err !== null) {
    console.error(`ERROR: ${err}`)
  } else {
    console.log(message)
  }
}

toUpper('hello world', display)


let sql = `SELECT count(id) AS count FROM accounts WHERE user="${user}";`
	let records = await db.query(sql)

