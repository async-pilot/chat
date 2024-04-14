/// <reference path="../pb_data/types.d.ts" />

const adminUser = {
  email: process.env.ADMIN_USER_EMAIL ?? "admin@example.com",
  password: process.env.ADMIN_USER_PASSWORD ?? "adminADMIN",
};

migrate(
  (db) => {
    const dao = new Dao(db);

    const admin = new Admin({ email: adminUser.email });
    admin.setPassword(adminUser.password);
    dao.saveAdmin(admin);
  },
  (db) => {
    const dao = new Dao(db);
    try {
      const admin = dao.findAdminByEmail(adminUser.email);
      dao.deleteAdmin(admin);
    } catch {}
  }
);
