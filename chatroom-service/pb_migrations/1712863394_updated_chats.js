/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g3dvu1j7zljy0jl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3jmk2rcx",
    "name": "type",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g3dvu1j7zljy0jl")

  // remove
  collection.schema.removeField("3jmk2rcx")

  return dao.saveCollection(collection)
})
