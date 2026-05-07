module.exports = {
  "resource": "Character",
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
  ]
};
