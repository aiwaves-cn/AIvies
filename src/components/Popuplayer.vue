<template>
    
</template>

<script>
export default {
    props: {
        dialogVisible: Boolean
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        }
    }
}
</script>

<style></style>