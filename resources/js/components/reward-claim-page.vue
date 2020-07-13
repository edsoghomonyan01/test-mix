<template>
    <div class="container">
        <div class="row mb-4">
            <div class="col-12">
                <h1 class="off-black text-center">
                    LeverEdge Reward Requests
                </h1>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div v-if="rewardClaims.length" class="row mb-5">
                    <div class="col-12">
                        <h2>Rewards you've requested</h2>
                    </div>

                    <div v-for="rewardClaim in rewardClaims" :key="rewardClaim.id" class="col-12 mt-3">
                        <div class="card">
                            <div class="card-header" data-toggle="collapse" :data-target="'#reward-claim-details-' + rewardClaim.id" aria-expanded="false" :aria-controls="'reward-claim-details-' + rewardClaim.id">
                                <p class="card-title mb-0 fw-600">
                                    <a href="javascript:void(0)">
                                        Reward for ${{ parseInt(rewardClaim.loan_amount) }} Loan from {{ rewardClaim.deal.name }}
                                    </a>
                                </p>
                            </div>
                            <div :id="'reward-claim-details-' + rewardClaim.id" class="card-body p-0 collapse">
                                <table class="table table-borders">
                                    <tr>
                                        <td>Deal</td>
                                        <td v-text="rewardClaim.deal.name" />
                                    </tr>
                                    <tr>
                                        <td>Reward Amount</td>
                                        <td>${{ rewardClaim.reward_amount }}</td>
                                    </tr>
                                    <tr>
                                        <td>Loan Amount</td>
                                        <td>${{ rewardClaim.loan_amount }}</td>
                                    </tr>
                                    <tr>
                                        <td>Payment Method</td>
                                        <td v-text="rewardClaim.payment_method.name" />
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td v-text="rewardClaim.status" />
                                    </tr>
                                    <tr>
                                        <td>Is Paid</td>
                                        <td>
                                            <i v-if="rewardClaim.is_paid" class="fal fa-check-circle" />
                                            <i v-else class="fal fa-times-circle" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Submitted Date</td>
                                        <td v-text="rewardClaim.date_submitted" />
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="saved" class="alert alert-success alert-dismissible fade show" role="alert">
                    <p>We've received your request and will get back to you as soon as we can confirm the loan</p>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <template v-if="showForm">
                    <h2>Request Reward</h2>
                    <div class="form-group">
                        <label for="deal">Lender / Partner</label>
                        <select id="deal"
                                v-model="form.deal"
                                class="form-control"
                                :class="{'is-invalid': hasError('deal')}">
                            <option :value="null" selected>
                                Select Lender / Partner
                            </option>
                            <option v-for="deal in deals"
                                    :key="deal.id"
                                    :value="deal"
                                    v-text="deal.name" />
                        </select>
                        <div v-if="hasError('deal')" class="invalid-feedback" role="alert" v-text="getError('deal')" />
                    </div>
                    <div class="form-group">
                        <label for="loan_amount">Loan Amount</label>
                        <input id="loan_amount"
                               v-model="form.loan_amount"
                               type="number"
                               class="form-control"
                               :class="{'is-invalid': hasError('loan_amount')}">
                        <div v-if="hasError('loan_amount')" class="invalid-feedback" role="alert" v-text="getError('loan_amount')" />
                    </div>
                    <div class="form-group">
                        <label for="reward_amount">Reward Amount</label>
                        <input id="reward_amount"
                               type="number"
                               class="form-control"
                               :value="rewardAmountValue"
                               :readonly="true"
                               :diabled="true">
                        <div class="invalid-feedback" role="alert" />
                    </div>
                    <div class="form-group">
                        <label for="payment_method_id">Payment Method</label>
                        <select id="payment_method_id"
                                v-model="form.payment_method_id"
                                class="form-control"
                                :class="{'is-invalid': hasError('payment_method_id')}">
                            <option :value="null">
                                Select Payment Method
                            </option>
                            <option v-for="paymentMethod in paymentMethods"
                                    :key="paymentMethod.id"
                                    :value="paymentMethod.id"
                                    v-text="paymentMethod.name" />
                        </select>
                        <p class="text-muted mb-0">
                            Your reward will be sent to <span v-text="userEmail" />
                        </p>
                        <div v-if="hasError('payment_method_id')" class="invalid-feedback" role="alert" v-text="getError('payment_method_id')" />
                    </div>
                    <div class="form-group">
                        <label>Final Disclosure Document (<a href="javascript:void(0)" data-toggle="tooltip" title="We don't receive PII from our partners. We use the information in this document to match the reports we do receive to confirm your eligibility for the rewards.">why do we need this?</a>
                            )</label>
                        <file-dropzone id="dropzone"
                                       ref="myVueDropzone"
                                       :options="dropzoneOptions"
                                       @vdropzone-success="fileUploadedSuccessfully"
                                       @vdropzone-error="fileUploadError" />
                    </div>
                    <p v-if="hasError('fileId')" class="danger mb-3" v-text="getError('fileId')" />

                    <div class="sign-up-next form-group mb-0">
                        <button class="btn btn-block btn-primary" @click.prevent="claimReward">
                            Request Reward
                        </button>
                    </div>
                </template>
            </div>
        </div>

        <div v-if="showForm" class="row mt-5">
            <div class="col-12">
                <h4>
                    <span class="fw-600">I don't want to share the final disclosure. Is there any other way to get my reward?</span>
                </h4>
                <p>
                    You may edit the document to hide any information that you are not comfortable sharing. The information we need includes the following:
                </p>
                <ol>
                    <li>Full Name</li>
                    <li>Total Loan Amount</li>
                    <li>The "Right to Cancel" date</li>
                </ol>

                <p>
                    We'd prefer you include the following, however it is not required to receive your rewards.
                    The optional information helps ensure lenders are providing you with quotes that match those we received in our evaluation process.
                </p>
                <ol>
                    <li>Interest Rate / APR</li>
                    <li>Is the rate fixed or variable</li>
                    <li>Repayment plan</li>
                    <li>Loan Term</li>
                </ol>
                <p>
                    For example, you may hide your address. If you remain uncomfortable, please send a note to <a href="mailto:support@leveredge.org">support@leveredge.org</a> and we'll do our best to find a way.
                </p>

                <h4 class="mt-4">
                    <span class="fw-600">How to find your final disclosure document?</span>
                </h4>
                <h5>
                    CommonBond
                </h5>
                <ol>
                    <li>Login to your CommonBond Account</li>
                    <li>Navigate to <strong>Member Home</strong> by clicking on the link in the dropdown under your name in the Navigational Menu</li>
                    <li>Click on <strong>Your documents and additional details</strong></li>
                    <li>The document is titled <strong>Final Disclosure</strong></li>
                    <li>Click on <strong>View Document</strong> and proceed to Download the Document on your Computer</li>
                    <li>Upload the document above</li>
                </ol>

                <h5 class="mt-3">
                    Other Lenders/Partners
                </h5>
                <p>
                    Instructions coming soon
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import fileDropzone from 'vue2-dropzone';

    const errorsDefault = {
        deal:           [],
        loan_amount:    [],
        payment_method: [],
    };

    export default {
        components: {
            fileDropzone,
        },

        props: {
            deals: {
                required: true,
                type:     Array,
            },
            paymentMethods: {
                required: true,
                type:     Array,
            },
            previousRewards: {
                required: true,
                type:     Array,
            },
        },
        data() {
            return {
                form: {
                    deal:              null,
                    loan_amount:       null,
                    payment_method_id: null,
                },
                dropzoneOptions: {
                    url:            '/file-upload',
                    maxFiles:       1,
                    thumbnailWidth: 150,
                    headers:        {
                        'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
                    },
                    params: {
                        path:                 null,
                    },
                    language: {
                        dictDefaultMessage: 'Drop a PDF or Image here, or click to select a file to upload.',
                    },
                },
                fileId:            null,
                errors:            errorsDefault,
                saved:             false,
                rewardClaims:      [],
                showForm:          true,
                userEmail:         null,
                userId:            null,
                rewardAmountValue: 0,
            };
        },
        watch: {
            'form.deal': {
                handler() {
                    this.calculateRewardAmount();
                },
                deep: true,
            },
            'form.loan_amount': {
                handler() {
                    this.calculateRewardAmount();
                },
                deep: true,
            },
        },

        mounted() {
            this.userId = window.userId.toString();
            this.userEmail = window.userEmail;
            this.dropzoneOptions.params.path = `users/${window.userId}/screenshots`;
            this.rewardClaims = this.previousRewards;
        },

        methods: {
            fileUploadedSuccessfully(file, response) {
                this.fileId = response.id;
            },

            fileUploadError(file, message, xhr) {
                document.getElementsByClassName('dz-error-message')[0].innerHTML = message.errors.file[0];
            },

            claimReward() {
                const data = {
                    ...this.form,
                    fileId:  this.fileId,
                    deal_id: this.form.deal.id,
                };

                axios.post(`/member/reward-claim`, data)
                    .then(({data}) => {
                        this.saved = true;
                        setTimeout(() => {
                            this.saved = false;
                        }, 5000);
                        this.errors = errorsDefault;
                        for (const key in this.form) {
                            this.form[key] = null;
                        }
                        this.rewardClaims = data.rewardClaims;
                        this.showForm = false;
                    }).catch((error) => {
                        this.errors = error.response.data.errors;
                    });
            },

            hasError(key) {
                return this.errors.hasOwnProperty(key) && this.errors[key].length;
            },

            getError(key) {
                return this.errors[key][0];
            },
            calculateRewardAmount() {
                const loanAmount = parseInt(this.form.loan_amount);
                if (Number.isInteger(loanAmount) !== true) {
                    this.rewardAmountValue = 0;
                }
                if (this.form.deal !== null) {
                    const data = {
                        loan_amount: loanAmount,
                        deal_id:     this.form.deal.id,
                    };
                    axios.post('/member/get-reward-amount', data)
                        .then(({data}) => {
                            this.rewardAmountValue = Math.round(data.rewardAmount);
                        });
                } else {
                    this.rewardAmountValue = 0;
                }
            },
        },
    };
</script>
