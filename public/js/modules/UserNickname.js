export default {

    props: ['usr'],

    template: `
    
    <p class="new-user" :class="{ 'my-user' : matchedID }">
    <span>{{usr.name}}</span>
    </p>
    
    `,

    data: function() {
        return {
            matchedID: this.$parent.socketID == this.usr.id
        }
    }

}