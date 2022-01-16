<template>
  <v-data-table
    :headers="headers"
    :items="daftaradmin"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Manage Admin</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="350px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Admin
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
              <v-spacer></v-spacer>
              <v-btn text @click="close">
                <v-icon small color="blue darken-1">
                  mdi-close
                </v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.nidn"
                      label="NIDN"
                      :disabled="editedIndex !== -1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nama"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.password"
                      :disabled="editedIndex !== -1 ? !status : false"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-switch
                    v-if="editedIndex !== -1"
                    v-model="status"
                    :label="`Edit password`"
                  ></v-switch> -->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="save">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.status`]="{ item }">
      <v-chip :color="getColor(item.status)" small dark>{{
        item.status
      }}</v-chip>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        v-if="item.nidn !== 0"
        color="amber"
        size="18"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        v-if="item.nidn !== 0"
        color="red"
        size="18"
        class="mr-2"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from "@/core/api";
import { successAlert, errorAlert, Swal } from "@/core/plugins/my-swal";

export default {
  data: () => ({
    dialog: false,
    tanggal: false,
    status: false,
    search: "",
    headers: [
      { text: "No", value: "no" },
      { text: "NIDN", value: "nidn" },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    daftaradmin: [],
    editedIndex: -1,
    editedItem: {
      nidn: "",
      name: "",
      password: "",
      email: ""
    },
    defaultItem: {
      name: "",
      nidn: "",
      email: "",
      password: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Admin" : "Edit Admin";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    getColor(status) {
      if (status == "aktif") return "green";
      else return "red";
    },

    async initialize() {
      const adminPayload = await axios({
        method: "get",
        url: "/admin",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      this.daftaradmin = adminPayload.data.map((item, index) => {
        return {
          no: index + 1,
          nidn: item.nidn,
          name: item.name,
          email: item.email
        };
      });
    },

    editItem(item) {
      this.editedIndex = this.daftaradmin.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (
        !this.editItem.nidn ||
        !this.editItem.name ||
        !this.editedItem.email ||
        !this.editedItem.password
      ) {
        return errorAlert(
          "Tidak boleh ada data yang kosong, harus diisi semua!"
        );
      }
      try {
        let response;
        if (this.editedIndex > -1) {
          // Edit Admin
          response = await axios({
            method: "patch",
            url: `/admin/${this.editedItem.nidn}`,
            data: {
              name: this.editedItem.name,
              email: this.editedItem.email
            },
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
        } else {
          // Add Admin
          response = await axios({
            method: "post",
            url: "/admin/register",
            data: {
              nidn: Number(this.editedItem.nidn),
              name: this.editedItem.name,
              email: this.editedItem.email,
              password: this.editedItem.password
            },
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
        }
        if (response) {
          this.close();
          successAlert(response.data.message);
          this.initialize();
        }
      } catch (err) {
        errorAlert(err.response.data.message);
      }
    },

    deleteItem(item) {
      Swal.fire({
        title: "Hapus Admin",
        text: "Apakah anda yakin ingin menghapus admin ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        heightAuto: false
      }).then(async result => {
        if (result.value) {
          try {
            const response = await axios({
              method: "delete",
              url: `/admin/${item.nidn}`,
              headers: {
                Authorization: localStorage.getItem("token")
              }
            });
            if (response) {
              successAlert(response.data.message);
              this.initialize();
            }
          } catch (err) {
            errorAlert(err.response.data.message);
          }
        }
      });
    }
  }
};
</script>
