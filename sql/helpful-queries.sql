-- Check the auto increment value
SELECT Auto_increment FROM information_schema.tables WHERE table_name='the_table_you_want';

-- Change the auto increment by
SET @@auto_increment_increment=1;

-- If you want to start the values at a number other than one you can go:
ALTER TABLE tbl AUTO_INCREMENT = 100;
