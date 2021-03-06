exports.up = function (knex, Promise) {
    return Promise.all([

    // User table
    knex.schema.createTable('users', function (table) {
            // Basic ID + security fields
            table.timestamps();
            table.increments('user_id').primary();
            table.string('name');
            table.string('email', 100).unique();
            table.string('password', 100);
            table.string('reset_password_token', 32).unique();
            table.timestamp('reset_password_expires');
            table.string('email_validation_token', 32).unique();
            table.timestamp('email_validation_expires');
            table.boolean('enabled').defaultTo(true);
            table.boolean('validated').defaultTo(false);
            table.string('roles', 200).defaultTo('');

            // Profile fields
            table.string('first_name', 64);
            table.string('last_name', 64);
            table.enu('gender', ['male', 'female', 'other']);
            table.date('date_of_birth');
            table.string('israeli_id', 9);
            table.string('address', 100);
            table.string('cell_phone', 10);
            table.string('extra_phone', 10);
            table.boolean('npo_member').defaultTo(false);
            table.string('facebook_id', 50);
            table.string('facebook_token', 255);
        }),

    // Payments table
    knex.schema.createTable('payments', function (table) {
            table.timestamps();
            table.increments('payment_id').primary();
            table.string('private_sale_token', 40);
            table.string('public_sale_token', 40);
            table.string('url', 256);
            table.integer('user_id').unsigned();
            table.boolean('payed').defaultTo(false);
        }),

    // NPO table
    knex.schema.createTable('npo_members', function (table) {
            table.timestamps();
            table.integer('user_id').unsigned().primary();
            table.enu('membership_status', ['not_member', 'request_approved', 'member_paid', 'member_should_pay', 'banned', 'request_rejected', 'applied_for_membership']).defaultTo('not_member');
            table.timestamp('application_date');
            table.date('membership_start_date');
            table.date('membership_end_date');
            table.text('form_previous_p', 'LONGTEXT');
            table.text('form_future_p', 'LONGTEXT');
            table.text('form_why_join', 'LONGTEXT');
        })
        ]);
};

exports.down = function (knex, Promise) {};
