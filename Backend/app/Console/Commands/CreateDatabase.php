<?php

namespace App\Console\Commands;

use DB;
use Illuminate\Console\Command;

class CreateDatabase extends Command
{
    protected $signature = 'db:create';
    protected $description = 'Creates a new MySQL database based on the mysql configurations present in environment variables';

    public function handle(): void
    {
        $dbName = config("database.connections.mysql.database");
        $charset = config("database.connections.mysql.charset");
        $collation = config("database.connections.mysql.collation");

        config(["database.connections.mysql.database" => null]); // set current database key to null in order to create a new database

        $createDbQuery = "CREATE DATABASE IF NOT EXISTS $dbName CHARACTER SET $charset COLLATE $collation;";

        DB::statement($createDbQuery);

        config(["database.connections.mysql.database" => $dbName]); // set database key to the newly created database for subsequent db operations
    }
}
