# Study Workload plugin for Moodle

This plugin adds blocks for students and teachers to see course workload and schedule assignments more efficiently.

## Installation

Download the `study-workload.zip` from [the latest release](https://github.com/illright/workload-moodle-iu/releases/latest).

Log in to your Moodle instance as an administrator, then go to **Site Administration**, the **Plugins** tab. 

<details><summary>Checkpoint</summary>

![Steps 1-3](./.github/readme-images/1-site-administration-plugins.jpg)

</details>

Click **Install plugins**, upload the ZIP file and click the **Install plugin from ZIP file** button below. You will be prompted to upgrade your database, agree to it.

<details><summary>Checkpoint</summary>

![Steps 4-5](./.github/readme-images/2-install-plugin.jpg)
![Step 6](./.github/readme-images/3-validation.jpg)
![Step 7](./.github/readme-images/4-admin-page.jpg)
![Step 8](./.github/readme-images/5-db-upgrade.jpg)

</details>

After the plugin is installed, go to **Site Administration** again as an administrator and click the **Blocks editing on** button above the settings to the right. 

<details><summary>Checkpoint</summary>

![Step 9](./.github/readme-images/6-block-editing.jpg)

</details>

Then go to **Site Home** (the second entry in the left side panel) and click the **Add a block** button in that same side panel, all the way down below. Choose **Study Workload** from the list of entries and add the block. You will see it pop up to the right.

<details><summary>Checkpoint</summary>

![Steps 10-11](./.github/readme-images/7-site-home.jpg)

</details>

Click the gear icon on the newly created block and select **Configure Study Workload block**.

<details><summary>Checkpoint</summary>

![Steps 12-13](./.github/readme-images/8-configure-block.jpg)

</details>

In the **Page contexts** field, select **Display throughout the entire site**.

<details><summary>Checkpoint</summary>

![Steps 14](./.github/readme-images/9-display-everywhere.jpg)

</details>

Congratulations, you're done! :)

## Development

You can develop this plugin using the following Docker Compose file:

```yaml
version: '2'
services:
  mariadb:
    image: docker.io/bitnami/mariadb:10.3
    ports:
      - '3306:3306'
    environment:
      # ALLOW_EMPTY_PASSWORD is recommended only for development.
      - ALLOW_EMPTY_PASSWORD=yes
      - MARIADB_USER=bn_moodle
      - MARIADB_DATABASE=bitnami_moodle
      - MARIADB_CHARACTER_SET=utf8mb4
      - MARIADB_COLLATE=utf8mb4_unicode_ci
    volumes:
      - './mariadb-data:/bitnami/mariadb'
  moodle:
    image: docker.io/bitnami/moodle:3
    ports:
      - '80:8080'
      - '443:8443'
    environment:
      - MOODLE_DATABASE_HOST=mariadb
      - MOODLE_DATABASE_PORT_NUMBER=3306
      - MOODLE_DATABASE_USER=bn_moodle
      - MOODLE_DATABASE_NAME=bitnami_moodle
      # ALLOW_EMPTY_PASSWORD is recommended only for development.
      - BITNAMI_DEBUG=true
      - ALLOW_EMPTY_PASSWORD=yes
    volumes:
      - 'moodledata_data:/bitnami/moodledata'
      - './moodle-data:/bitnami/moodle'
      - './workload-moodle-iu:/bitnami/moodle/blocks/study-workload'
    depends_on:
      - mariadb

volumes:
  moodledata_data:
    driver: local
```
