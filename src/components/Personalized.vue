<template>
  <div class='personalized'>
    <div class="personalized-top">
      <h3>{{title}}</h3>
    </div>
    <div class="personalized-list">
      <div
        class="item"
        v-for="value in personalized"
        :key="value.id">
        <img :src="value.picUrl"/>
        <p>{{value.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
    title: String
  }
}
</script>
<style scoped lang='scss'>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/variable.scss';
.personalized {
  @include bg_sub_color();
  .personalized-top{
    @include bg_sub_color();
    width: 100%;
    height: 84px;
    line-height: 84px;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3{
      @include font_size($font_large);
      @include font_color();
      font-weight: bold;
    }
  }
  .personalized-list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .item{
      width: 200px;
      padding: 20px 0;
      img{
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }
      p{
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium_s);
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>
