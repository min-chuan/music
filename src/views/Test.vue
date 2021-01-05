<template>
  <div class='test'>
    <div class="father">
      <ul class="son"
          @click="clickHandler">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Test',
  methods: {
    clickHandler(e) {
      console.log('offsetTop', e.target.offsetTop)
      console.log('offsetWidth', e.target.offsetWidth)
      console.log('offsetHeight', e.target.offsetHeight)
    },
  },
}
</script>
<style scoped lang='scss'>
.test {
  .father {
    position: relative;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    overflow: auto;
    .son {
      width: 100px;
      margin: 50px auto;
      background-color: red;
      li {
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>
