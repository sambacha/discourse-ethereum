import showModal from "discourse/lib/show-modal";
import computed from "ember-addons/ember-computed-decorators";

export default Ember.Component.extend({
  tagName: "span",

  @computed("model.can_do_eth_transaction")
  disabled(canDoTransaction) {
    // return ( !canDoTransaction || (typeof window.web3 == "undefined") || !window.web3.eth.defaultAccount );
    // Don't check for a defaultAccount, MetaMask connection may not have been accepted yet
    // Check for window.ethereum, since window.web3 is being depricated
    return ( !canDoTransaction || ((typeof window.ethereum == "undefined") && (typeof window.web3 == "undefined")) );
    // canDoTransaction is probably supposed to be referencing the result of can_do_eth_transaction? from plugin.rb
    // return ( (typeof window.ethereum == "undefined") && (typeof window.web3 == "undefined") );
  },

  actions: {
    showSendEthModal() {
      if (this.get("disabled")) return;
      window.withWeb3().then( ()=> {
        showModal("send-eth", {model: this.get("model")});

        // if (this.get("close")) this.sendAction("close");
        if (this.get("close")) this.close();
      });
    }
  }
});
