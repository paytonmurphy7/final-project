module.exports = {
  "resource": "Anime",
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
  ]
};
