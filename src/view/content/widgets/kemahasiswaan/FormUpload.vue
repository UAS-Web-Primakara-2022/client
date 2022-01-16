<template>
  <form>
    <v-select
      v-model="tingkatan"
      :items="items"
      label="Pilih Tingkatan"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>

    <v-text-field v-model="name" label="Nama Kegiatan" required></v-text-field>

    <v-file-input
      v-model="files"
      accept="image/*"
      show-size
      counter
      label="Upload poster / dokumen (max: 5Mb)"
      required
    ></v-file-input>

    <div style="text-align: right;" class="mt-5">
      <v-btn class="mr-4" @click="submit">
        Submit
      </v-btn>
      <v-btn @click="clear">
        Clear
      </v-btn>
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { successAlert, errorAlert } from "@/core/plugins/my-swal";
import axios from "@/core/api";

export default {
  mixins: [validationMixin],

  validations: {
    desc: { required },
    name: { required, maxLength: maxLength(33) },
    email: { required, email },
    select: { required }
  },

  data: () => ({
    tingkatan: "",
    name: "",
    files: null,
    items: ["PROVINSI", "KOTA", "NASIONAL", "INTERNASIONAL"]
  }),

  computed: {
    // selectErrors() {
    //   const errors = [];
    //   if (!this.$v.select.$dirty) return errors;
    //   !this.$v.select.required && errors.push("Item is required");
    //   return errors;
    // },
    // nameErrors() {
    //   const errors = [];
    //   if (!this.$v.name.$dirty) return errors;
    //   !this.$v.name.maxLength &&
    //     errors.push("Name must be at most 10 characters long");
    //   !this.$v.name.required && errors.push("Name is required.");
    //   return errors;
    // },
    // emailErrors() {
    //   const errors = [];
    //   if (!this.$v.email.$dirty) return errors;
    //   !this.$v.email.email && errors.push("Must be valid e-mail");
    //   !this.$v.email.required && errors.push("E-mail is required");
    //   return errors;
    // },
  },

  methods: {
    async submit() {
      if (!this.tingkatan || !this.name || !this.files) {
        return errorAlert(
          "Tidak boleh ada data yang kosong, harus diisi semua!"
        );
      }
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("nim", localStorage.getItem("nim"));
        formData.append("tingkatan", this.tingkatan);
        formData.append("image", this.files);

        const response = await axios({
          method: "POST",
          url: "/tak",
          data: formData,
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        if (response) {
          successAlert("Berhasil submit data");
          this.clear();
        }
      } catch (error) {
        // console.log(JSON.stringify(error));
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.tingkatan = "";
      this.email = "";
      this.files = null;
    }
  }
};
</script>
