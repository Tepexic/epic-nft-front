<template>
  <div id="app">
    <div
      class="tw-flex tw-flex-col tw-min-h-screen tw-justify-between tw-bg-gradient-to-r tw-from-pink-700 tw-to-blue-700 tw-text-white"
    >
      <the-header />
      <main
        class="p-4 tw-flex tw-flex-col tw-items-center tw-text-xl md:tw-text-2xl tw-w-full md:tw-w-4/5 lg:tw-w-3/5 xl:tw-w-1/2 tw-mx-auto"
      >
        <img
          src="@/assets/nft_example.svg"
          alt="NFT Example"
          class="tw-rounded tw-shadow"
        />
        <h2 class="tw-my-10">
          Acuña un NFT único (en formato SVG) en la red Rinkeby con la
          descripción que tendrías si fueras artista.
        </h2>
        <action-button
          text="Conecta tu monedero"
          v-if="!account"
          @click="connectWallet"
        />
        <action-button
          text="Acuña tu NFT"
          v-if="account && !mining"
          @click="mintNFT"
        />
        <div
          class="tw-bg-pink-800 hover:tw-bg-pink-700 hover:tw-scale-105 tw-w-full tw-text-xl md:tw-text-2xl tw-px-6 tw-py-4 tw-border-none tw-shadow tw-flex tw-items-center tw-justify-center"
          v-if="mining"
        >
          <svg
            viewBox="0 0 24 24"
            class="tw-animate-bounce tw-h-10 tw-w-10 tw-mr-4 tw-fill-current"
          >
            <path
              fill="currentColor"
              d="M14.79,10.62L3.5,21.9L2.1,20.5L13.38,9.21L14.79,10.62M19.27,7.73L19.86,7.14L19.07,6.35L19.71,5.71L18.29,4.29L17.65,4.93L16.86,4.14L16.27,4.73C14.53,3.31 12.57,2.17 10.47,1.37L9.64,3.16C11.39,4.08 13,5.19 14.5,6.5L14,7L17,10L17.5,9.5C18.81,11 19.92,12.61 20.84,14.36L22.63,13.53C21.83,11.43 20.69,9.47 19.27,7.73Z"
            />
          </svg>
          <div>Minando</div>
        </div>
      </main>
      <the-footer />
    </div>
  </div>
</template>

<script>
import ActionButton from "./components/ActionButton.vue";
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";

import { ethers } from "ethers";
import MyEpicNFT from "./utils/MyEpicNFT.json";

export default {
  name: "App",
  components: { TheHeader, TheFooter, ActionButton },
  data() {
    return {
      ethereum: null,
      accounts: [],
      account: null,
      provider: null,
      signer: null,
      contract: null,
      contractAddress: "0x2911Ad7Dc1469043D35217ab6E5f8B3466b85E2f",
      mining: false,
      txn: null,
    };
  },
  methods: {
    makeToast(title = "", body = "", variant = null) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
    checkIfWalletIsConnected() {
      /*
       * First make sure we have access to window.ethereum
       */
      try {
        const { ethereum } = window;
        if (!ethereum) {
          this.getMetamask();
          return;
        } else {
          this.ethereum = ethereum;
          const log = "We have the ethereum object";
          console.log(log, ethereum);
        }
      } catch (e) {
        console.error(e);
      }
    },
    async connectWallet() {
      /**
       * Check if we're authorized to access wallet
       */
      if (this.ethereum) {
        this.accounts = await this.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (this.accounts.length) {
          this.account = this.accounts[0];
          console.log(`Found an authorized account: ${this.account}`);
          if (!this.contract) {
            this.connectContract();
          }
          this.makeToast("Wallet found", `Wallet connected!`, "success");
        } else {
          console.log("No accounts found");
          this.makeToast(
            "Error connecting to wallet",
            `Error: No accounts found`,
            "danger"
          );
        }
      } else {
        this.getMetamask();
      }
    },
    async connectContract() {
      try {
        if (this.ethereum && this.account) {
          this.provider = new ethers.providers.Web3Provider(this.ethereum);
          this.signer = this.provider.getSigner();
          this.contract = new ethers.Contract(
            this.contractAddress,
            MyEpicNFT.abi,
            this.signer
          );
        }
      } catch (e) {
        this.makeToast("Error connecting to contract", `Error: ${e}`, "danger");
        console.error(e);
      }
    },
    getMetamask() {
      this.makeToast("No Wallet detected", "Please get metamask", "danger");
    },
    async mintNFT() {
      try {
        this.txn = await this.contract.makeAnEpicNFT();
        this.mining = true;
        await this.txn.wait();
        this.mining = false;
        this.makeToast(
          "Mined!",
          `See transaction at https://rinkeby.etherscan.io/tx/${this.txn.hash}`,
          "success"
        );
        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${this.txn.hash}`
        );
      } catch (e) {
        this.makeToast("Error minting NFT", `Error: ${e}`, "danger");
        console.error(e);
        this.mining = false;
      }
    },
  },
  async created() {
    document.title = "Ethereum NFT Collection";
    this.checkIfWalletIsConnected();
    await this.connectContract();
  },
};
</script>

<style></style>
