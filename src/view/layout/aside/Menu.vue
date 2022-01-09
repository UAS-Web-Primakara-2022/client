<template>
  <ul class="menu-nav">
    <router-link
      to="/dashboard"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon flaticon2-architecture-and-city"></i>
          <span class="menu-text">Dashboard</span>
        </a>
      </li>
    </router-link>

    <li class="menu-section">
      <h4 class="menu-text">Menu</h4>
      <i class="menu-icon flaticon-more-v2"></i>
    </li>

    <router-link
      v-if="user.role === 'mahasiswa'"
      to="/uploadinfo"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon fas fa-upload"></i>
          <span class="menu-text">Upload Informasi</span>
        </a>
      </li>
    </router-link>

    <router-link
      v-if="user.role === 'mahasiswa'"
      to="/listaktas"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon fas fa-book"></i>
          <span class="menu-text">List Aktivitas</span>
        </a>
      </li>
    </router-link>

    <router-link
      v-if="user.role === 'admin'"
      to="/validasiaktas"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon fas fa-check"></i>
          <span class="menu-text">Validasi Aktivitas</span>
        </a>
      </li>
    </router-link>

    <router-link
      v-if="user.role === 'admin'"
      to="/mahasiswamanage"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon fas fa-graduation-cap"></i>
          <span class="menu-text">Daftar Mahasiswa</span>
        </a>
      </li>
    </router-link>

    <router-link
      v-if="user.role === 'admin'"
      to="/usermanage"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon fas fa-users"></i>
          <span class="menu-text">Daftar Admin</span>
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "KTMenu",
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  },
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user = {
      role: localStorage.getItem("role")
    };
  }
};
</script>
