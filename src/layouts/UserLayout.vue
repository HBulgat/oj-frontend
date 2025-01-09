<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <img src="../assets/oj-logo.png" class="logo"
      /></a-layout-header>
      <a-layout-content class="content">
        <a-space></a-space>
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://hbulgat.github.io" target="_blank"> XOJ by bulgat </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style>
#userLayout {
  text-align: center;
}
#userLayout .logo {
  margin-top: 20px;
  width: 64px;
  height: 64px;
}
#userLayout .header {
  padding-inline: 20px;
  background: #f5f5f5;
  color: unset;
  margin-bottom: 16px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>

<script setup lang="ts"></script>
