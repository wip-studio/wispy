# WISPY 🌱
An experimental lightweight (remote procedure call) API pattern.

## Idea
Execute functions or piece of code living in your API end without any hassles of creating multiple endpoints (REST) or managing complex schemas (GraphQL). Server essentially exposes functions or methods which can be called by client with standard JSON payload along with passing any parameters to it. 

## Comparisons
- Uses JSON unlike string based GQL in GraphQL or URL in REST
- Only one endpoint or route on server unlike in REST (similar to GraphQL)
- No strict schema unlike GraphQL
- Simple customizable payload in JSON format unlike in SOAP which uses XML and strict structure
- Option to select the fields you want the API to return (similar to GraphQL)
- No auto documentation generation yet (available in GraphQL)

## Examples

#### 1. Create

cURL
```bash
curl http://localhost:8000 \
  -H 'Content-type: application/json' \
  -d '{"operation": "productCreate", "params": {"name": "Product 1", "description": "Good product."}}'
```

fetch
```javascript
async function productCreate() {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "operation": "productCreate", 
        "params": {
          "name": "Product 1", 
          "description": "Good product."
        }
      })
    }
    const response = await fetch('http://localhost:8000', config)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

Result
```json
{
  "success": true,
  "message": "Product created successfully.",
  "data": {
    "_id": "5b914211aaabdc51bf1839a9",
    "name": "Product 1",
    "description": "Good product.",
    "createdAt": "2018-09-06T15:04:49.111Z",
    "updatedAt": "2018-09-06T15:04:49.111Z",
    "__v": 0
  }
}
```

#### 2.1 Read
cURL
```bash
curl http://localhost:8000 \
  -H 'Content-type: application/json' \
  -d '{"operation": "productList"}'
```

fetch
```javascript
async function productList() {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "operation": "productList" })
    }
    const response = await fetch('http://localhost:8000', config)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

Result
```json
{
  "success": true,
  "message": "",
  "data": [
    {
      "_id": "5b91146bcc58ba33ee349e28",
      "name": "Hercle, habena dexter!, clabulare!",
      "description": "Tremble oddly like a unrelated pathway.",
      "createdAt": "2018-09-06T11:50:03.910Z",
      "updatedAt": "2018-09-06T11:50:03.910Z",
      "__v": 0
    },
    {
      "_id": "5b9113b3cc58ba33ee349e26",
      "name": "Passion is a small captain.",
      "description": "This turbulence has only been evacuated by a reliable proton.",
      "createdAt": "2018-09-06T11:46:59.167Z",
      "updatedAt": "2018-09-06T11:49:52.799Z",
      "__v": 0
    }
  ]
}
```

#### 2.2 Read with fields selection
cURL
```bash
curl http://localhost:8000 \
  -H 'Content-type: application/json' \
  -d '{"operation": "productList", "fields": ["_id", "name"]}'
```

fetch
```javascript
async function productList() {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "operation": "productList", 
        "fields": ["_id", "name"]
      })
    }
    const response = await fetch('http://localhost:8000', config)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

Result
```json
{
  "success": true,
  "message": "",
  "data": [
    {
      "_id": "5b91146bcc58ba33ee349e28",
      "name": "Hercle, habena dexter!, clabulare!"
    },
    {
      "_id": "5b9113b3cc58ba33ee349e26",
      "name": "Passion is a small captain."
    }
  ]
}
```

#### 3. Update

cURL
```bash
curl http://localhost:8000 \
  -H 'Content-type: application/json' \
  -d '{"operation": "productUpdate", "params": {"_id": "5b914211aaabdc51bf1839a9", "name": "Product 1", "description": "Good product it is."}}'
```

fetch
```javascript
async function productUpdate() {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "operation": "productUpdate", 
        "params": {
          "_id": "5b914211aaabdc51bf1839a9", 
          "name": "Product 1", 
          "description": "Good product it is."
        }
      })
    }
    const response = await fetch('http://localhost:8000', config)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

Result
```json
{
  "success": true,
  "message": "Product updated successfully.",
  "data": {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
}
```

#### 4. Delete

cURL
```bash
curl http://localhost:8000 \
  -H 'Content-type: application/json' \
  -d '{"operation": "productRemove", "params": {"productId": "5b914211aaabdc51bf1839a9"}}'
```

fetch
```javascript
async function productRemove() {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "operation": "productRemove", 
        "params": { "productId": "5b914211aaabdc51bf1839a9" }
      })
    }
    const response = await fetch('http://localhost:8000', config)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

Result
```json
{
  "success": true,
  "message": "Product removed successfully.",
  "data": {
    "n": 1,
    "ok": 1
  }
}
```


## Setup and Running
- Prerequisites
  - Node
  - MongoDB

- Clone repo `git clone git@github.com:atulmy/wispy.git wispy`

- Configurations
  - Create `.env` for API `cd api` and `cp .env.example .env`
  - Modify `/api/.env` for PORT (optional)
  - Modify `/web/.env` for PORT / API URL (optional)

- Setup
  - API: Install packages and database setup `cd api` and `npm run setup`
  - Web: Install packages `cd web` and `npm install`

- Running
  - Run API `cd api` and `npm start`, API running at http://localhost:8000/
  - Run Web `cd web` and `npm start`, browse web app at http://localhost:3000/

- Change API to behave as RPC or REST or both
  - Available modes: `{ "rpc", "rest", "composite" }`
  - Set `endpoint.mode` in `api/src/setup/config/params.json` to one of available modes, eg: `composite`


## Todo
- [x] Execute operations
- [x] Accept params and fields selection
- [x] Inject authentication info to operations via middleware
- [x] Option to expose operations as REST endpoints
- [ ] Auto generate documentations


## Authors
- Atul Yadav - [GitHub](https://github.com/atulmy) · [Twitter](https://twitter.com/atulmy)

## Support
[![Become a Patreon](https://raw.githubusercontent.com/atulmy/atulmy.github.io/master/images/mix/patreon.png?v=1)](https://www.patreon.com/atulmy)

## License
Copyright (c) 2018 Atul Yadav http://github.com/atulmy

The MIT License (http://www.opensource.org/licenses/mit-license.php)
