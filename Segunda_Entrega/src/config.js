export default {
    fileSystem: {
        path: '../DB'
    },
    mongodb: {
        cnxStr: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: { //Cambiar por la config personal
        "type": "service_account",
                "project_id": "segundaentrega-77af2",
                "private_key_id": "29a20bb91b77d781d3affc1c9a067aad80c370eb",
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDnNB7433mINChS\n1YbRIxJ8q3XuRkNXmsDe5zvGxGXEBOyzHncoGni+xCVTOHZ6BEnSnfeRGcbuIcWv\nSJfIM1vbnI80JHe21DwwfsysfaPvu7x+x8Y37nOoIkx3R8qxopesbodGZJewBe0w\n/kEfRO1C1MLHAUj0x8FTL6XkxYae7jGqBth04Y+hL3z835+6sfwxEr4WCY7ckfkx\nOz3WsxbFTCoP3YiIOH5g+ZunhjBwp3LufbY3OI/kQIu7IvGC+t3ZDGXucmq0sV+5\nIFfGbGgCiXA+xGhUbX23A82sZ1zj3kvbE6zGB/jEwygZfvhXK2LH7wVWOlto9SFM\nFiIGLPl/AgMBAAECggEAA/bXhLV/bELv4alQmo7LFw3xKgJuNPcHavfOOHr1Zby4\nR3Za9uCRUaM9iP8OvpcK1WYo/Ww5BkWk+C7t9bXpU5gl6nAPop5iYJ1KXbcsk7ef\nCt6nbh3g2zEPXGI3CwAT/eLKEss2jWmXzT9Z/X/DwHtM0ndNEwlglFBDIp6/Nd1f\n7wl3mzn04lZ3Po8+tenX/cbIltLkHMvrwm8UmKkQTbb/r7QZ5sBQ7+TH9LFihk9f\nyYDoOPtox54vmrYJ9eA41kg852/aHklTTO7KfWTQGJd3p/WleUvUTdYVFFCq2E8G\ngVDFK69Q4vOrNe9yH0qTVgEzr+wzIZ0hbHxTS5heSQKBgQDzhuKnsBlVAs3TNCls\nKrKscj3+MX8+3M8NQpLZ4xGbxdNU+HNPLQ2sVuJ3UHASgTZfBXHL7yaFGhdyl4C9\nqNjuSCKGs5iK1OB3NHb7/FQY7BezHRGuCCu1io4wtxDAoZQdofouR2B45Ba0gQe9\nnr9sjcZqe/4cs/tu0ncNHEzO2QKBgQDzC6ctK6xuxIefNRw/jiO9GAcgziCefEeR\nVsje2cJ6EZsYl/nXBIBBU6BM5dnmghbFYuKmtoKAkNlhG5rCZRsk1EMz8EvFdhkh\nO1n1Y2qZclrPMQeg0WqVj2d8G4KWqPl2EVnPfpydxlkUEfiviZUrBG4o6imwLi8F\nX+mJh4MEFwKBgQC77hjVjVlPOFW8KmHY/m5aE+NxWaM30NDcC8cl7Ex3aMe4p+7c\naAlIONiVePaz4REjbSEvXsPcLZFwtif8tOOLpxE14DzUzojWlR9JQKVpgjCb4c/1\n/Io2k9E9GNkNvuN9prVZp210fZhj/bsKgwp4bER1gnBMmDxtfm+vJ2rCqQKBgFT8\n/S+RdxGgzaABjWg4Bw1Hiq6RBd0Frm0HQOSUlyniYC7AbhAfNc4iNQrO0VyGnvnU\n81bCuW3FuQ34/iv9+Pju9LUD0SsyeeUiAPoLEqqnz1NmXLmCoVe9Nr2yTP7sBZeg\nx5wENTYCtwGKq0COxsetG+xYvc0qySyC9oIuDcVvAoGAGekNZste4nY7S+ubZzXU\nWqqOlRPpyZj3rB3O1iLYwU1uI95DOJMQ/7vKZvIscVScfzvnN/lGc7HazG0d9w0q\nljVOkxAYsNxLHYai9Euy7GRqSQh2uhUsySe/OF/8m7rur7TellUO09zjEnWUiR0W\n+IHaKUhCBWbFXCybHBq9BKw=\n-----END PRIVATE KEY-----\n",
                "client_email": "firebase-adminsdk-1k4dt@segundaentrega-77af2.iam.gserviceaccount.com",
                "client_id": "111503240206086271849",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1k4dt%40segundaentrega-77af2.iam.gserviceaccount.com"
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'coderhouse',
            password: 'coderhouse',
            database: 'coderhouse'
        }
    }
}
