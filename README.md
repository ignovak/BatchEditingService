### Usage

#### Setup

```
yarn
# or
npm install
```

#### Run the server

```
yarn start
#
yarn run dev
```

#### Send the request

```
curl -X POST \
  http://localhost:3000/batch \
  -H 'Content-Type: application/json' \
  -d '{
	"endpoint": {
		"verb": "PUT",
		"url": "https://guesty-user-service.herokuapp.com/user/{userId}"
	},
	"payloads": [
		{
			"userId": "14",
			"requestBody": {
				"age": 30
			}
		},
		{
			"userId": "29",
			"requestBody": {
				"age": 30
			}
		},
		{
			"userId": "103",
			"requestBody": {
				"age": 30
			}
		}
	]
}'
```
