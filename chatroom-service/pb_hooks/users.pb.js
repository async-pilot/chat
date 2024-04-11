onRecordAfterUpdateRequest((e) => {
  try {
    const incomingUserId = e.record.get("id");
    const usersRecord = $app.dao().findRecordById("users", incomingUserId);

    // Assuming 'friends' is an array of friend IDs
    const friends = usersRecord.get("friends");

    if (friends.length > 0) {
      // Assuming the last friend added is the new one (might not always be correct)
      const newFriendId = friends[friends.length - 1];

      const chatsCollection = $app.dao().findCollectionByNameOrId("chats");
      const record = new Record(chatsCollection, {
        // Only add the incoming user and the new friend ID
        participants: [incomingUserId, newFriendId],
      });

      $app.dao().saveRecord(record);
    }
  } catch (e) {
    throw `failed to create chat: ${e}`;
  }
}, "users");
