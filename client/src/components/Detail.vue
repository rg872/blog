<template>
<div>
    <h1>{{ article.title }}</h1>
    <p>{{ article.content }}</p>
</div>  
</template>

<script>
export default {
    name: 'detail',
    data: function() {
        return{
            article: {}
        }
    },
    created: function () {
        this.article = this.$route.params.article
    }
}
</script>

<style>

</style>
