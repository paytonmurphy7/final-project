const validator = require("../validators/characters.js");

module.exports = {
  "type": "Character",
  "tableName": "characters",
  "fileBase": "characters",
  "path": "/characters",
  "operations": [
    "list",
    "retrieve",
    "create",
    "update",
    "delete"
  ],
  "shareable": false,
  "ownershipEnabled": true,
  "fields": [
    {
      "name": "name",
      "type": "string",
      "storageType": "string",
      "required": true,
      "relation": null,
      "query": {
        "param": "name",
        "op": "contains"
      }
    },
    {
      "name": "image_url",
      "type": "image_url",
      "storageType": "image_url",
      "required": false,
      "relation": null,
      "query": {
        "param": "image_url",
        "op": "contains"
      }
    },
    {
      "name": "anime",
      "type": "Anime",
      "storageType": "integer",
      "required": true,
      "relation": {
        "resourceType": "Anime",
        "targetField": "id"
      },
      "query": {
        "param": "anime",
        "op": "eq"
      }
    },
    {
      "name": "personality",
      "type": "Personality",
      "storageType": "integer",
      "required": true,
      "relation": {
        "resourceType": "Personality",
        "targetField": "id"
      },
      "query": {
        "param": "personality",
        "op": "eq"
      }
    },
    {
      "name": "description",
      "type": "text",
      "storageType": "text",
      "required": false,
      "relation": null,
      "query": null
    },
    {
      "name": "age",
      "type": "integer",
      "storageType": "integer",
      "required": false,
      "relation": null,
      "query": null
    }
  ],
  "permissions": {
    "list": "public",
    "retrieve": "public",
    "create": "user",
    "update": "owner",
    "delete": "owner"
  },
  "queryFilters": [
    {
      "param": "name",
      "fieldName": "name",
      "op": "contains",
      "type": "string",
      "storageType": "string",
      "relation": null,
      "choices": null
    },
    {
      "param": "image_url",
      "fieldName": "image_url",
      "op": "contains",
      "type": "image_url",
      "storageType": "image_url",
      "relation": null,
      "choices": null
    },
    {
      "param": "anime",
      "fieldName": "anime",
      "op": "eq",
      "type": "Anime",
      "storageType": "integer",
      "relation": {
        "resourceType": "Anime",
        "targetField": "id"
      },
      "choices": null
    },
    {
      "param": "personality",
      "fieldName": "personality",
      "op": "eq",
      "type": "Personality",
      "storageType": "integer",
      "relation": {
        "resourceType": "Personality",
        "targetField": "id"
      },
      "choices": null
    },
    {
      "param": "owner_id",
      "fieldName": "owner_id",
      "op": "eq",
      "type": "integer",
      "storageType": "integer",
      "relation": null
    }
  ]
};
module.exports.validator = validator;
