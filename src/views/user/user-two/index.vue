<template>
  <div>
    此页面是测试接口出错登陆重定向的，如果一直出错，请多登录几次。
  </div>
</template>

<script>
export default {
  name: 'userTwo',
  data() {
    return {

    };
  },
  computed: {

  },
  created() {
    // 这个接口偶尔会返回状态码508
    this.$api.user.test();
  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
</style>
