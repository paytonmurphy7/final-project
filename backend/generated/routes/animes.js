const validator = require("../validators/animes.js");

module.exports = {
  "type": "Anime",
  "tableName": "animes",
  "fileBase": "animes",
  "path": "/animes",
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
      "name": "title",
      "type": "string",
      "storageType": "string",
      "required": true,
      "relation": null,
      "query": {
        "param": "title",
        "op": "contains"
      }
    },
    {
      "name": "genre",
      "type": "string",
      "storageType": "string",
      "required": false,
      "relation": null,
      "query": {
        "param": "genre",
        "op": "contains"
      }
    },
    {
      "name": "release_year",
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
      "param": "title",
      "fieldName": "title",
      "op": "contains",
      "type": "string",
      "storageType": "string",
      "relation": null,
      "choices": null
    },
    {
      "param": "genre",
      "fieldName": "genre",
      "op": "contains",
      "type": "string",
      "storageType": "string",
      "relation": null,
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
