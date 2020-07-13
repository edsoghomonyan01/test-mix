<template>
    <div>
        <div class="bg-secondary-green">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-10">
                        <div class="white py-4">
                            <h1 class="white">
                                Graduate Student Loan Calculator
                            </h1>
                            <p>
                                Use this calculator to compare all your private student loan options and make an informed decision. We calculate your federal student loan options as well.
                            </p>
                            <div class="text-left">
                                <p class="mt-4">
                                    This calculator is different from others in two key ways:
                                </p>
                                <p class="mb-3"><strong>Want to learn about variable rates?</strong><br>This lets you project the lifetime cost of a variable rate loan using market projections for how variable rates will change over time.</p>
                                <p><strong>Plan to refinance?</strong><br>This calculates the cost of all your options up until you refinance, assuming you do so 6 months after graduation.</p>
                            </div>
                        </div>
                        <div class="row mb-4 white">
                            <div class="col-12 col-md-4">
                                <div class="form-group">
                                    <label for="lender"><a href="javascript:void(0)" data-toggle="tooltip" title="Use this tool to compare any private student loan lenders, including lenders we are not partnered with!" style="text-decoration: none !important; color: white !important;">Lender <i class="fal fa-info-circle"></i></a></label>
                                    <select id="lender"
                                            v-model="lender"
                                            class="form-control"
                                            name="lender">
                                        <template v-for="(value, text) in lenders">
                                            <option
                                                v-if="value.display_option"
                                                :key="text"
                                                :value="value"
                                                v-text="text" />
                                        </template>

                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="form-group">
                                    <label for="years">Loan term (years)</label>
                                    <input
                                        id="years"
                                        v-model.number="years"
                                        class="form-control"
                                        type="number"
                                        :min="5"
                                        :max="20">
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="form-group">
                                    <label for="apr"><a href="javascript:void(0)" data-toggle="tooltip" title="Enter the APR you’ve been quoted in any of your loan options.
Earnest quotes you an APR that does NOT include an auto-pay discount while other lenders do include it. Please subtract 0.25% from your Earnest APR before you enter it here.
" style="text-decoration: none !important; color: white !important;">APR <i class="fal fa-info-circle"></i></a></label>
                                    <div class="input-group mb-3">
                                        <input id="apr"
                                               v-model.number="apr"
                                               type="number"
                                               class="form-control"
                                               placeholder="Enter apr"
                                               name="apr"
                                               step=".01">
                                        <div class="input-group-append">
                                            <span class="input-group-text">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-4 white">
                            <div class="col-12 col-md-4">
                                <div class="form-group">
                                    <label for="rate_type">Rate Type</label>
                                    <select id="rate_type"
                                            v-model="rateType"
                                            class="form-control"
                                            name="years_of_school_left">
                                        <option v-for="(value, text) in rateTypes"
                                                :key="text"
                                                :value="value"
                                                v-text="value" />
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="form-group">
                                    <label for="repayment_type">Repayment option</label>
                                    <select id="repayment_type"
                                            v-model="repaymentType"
                                            class="form-control"
                                            name="years_of_school_left">
                                        <option v-for="(value, text) in repaymentTypes"
                                                :key="text"
                                                :value="value"
                                                v-text="value" />
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 d-flex align-items-end">
                                <div class="form-group w-100">
                                    <button
                                        type="button"
                                        class="btn btn-warning border-0 w-100 bg-accent-pink"
                                        @click="addCalculatedValue">
                                        <i class="fas fa-plus" style="font-size: 14px;" />
                                        <span>Create option</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <p class="white text-center">
                                    Scroll down to the table!
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="pt-5">
            <div class="container">
                <div class="row pb-5 justify-content-center">
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label for="years_of_school_left">Years of School Left</label>
                            <select id="years_of_school_left"
                                    v-model="yearOfSchoolLeft"
                                    class="form-control"
                                    name="years_of_school_left"
                                    @change="calculate">
                                <option v-for="(text, value) in yearOfSchoolLefts"
                                        :key="text"
                                        :value="value"
                                        v-text="text" />
                            </select>
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label for="loan_amount">Loan Amount</label>
                            <input id="loan_amount"
                                   v-model.number="loanAmount"
                                   type="number"
                                   class="form-control"
                                   placeholder="Enter loan amount"
                                   name="loan_amount"
                                   @input="calculate">
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label for="variable_assumption"><a href="javascript:void(0)" data-toggle="tooltip" title="To learn more about market projections for how variable rates might change, please see this detailed breakdown.">Variable Assumption <i class="fal fa-info-circle"></i></a></label>
                            <select id="variable_assumption"
                                    v-model="variableAssumption"
                                    class="form-control"
                                    name="years_of_school_left"
                                    @change="calculate">
                                <option v-for="(value, text) in variableAssumptions"
                                        :key="text"
                                        :value="value"
                                        v-text="value" />
                            </select>
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label for="after_graduation"><a href="javascript:void(0)" data-toggle="tooltip" title="If Yes, the calculator will show your the total cost of your loan options until you refinance, assuming you do so 6 months after you graduate"><strong>Refi after Graduation <i class="fal fa-info-circle"></i></strong></a></label>
                            <select id="after_graduation"
                                    v-model="after_graduation"
                                    class="form-control"
                                    name="refinancing_after_graduation"
                                    @change="calculate">
                                <option v-for="(value, text) in after_graduations"
                                        :key="text"
                                        :value="value"
                                        v-text="value" />
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="row justify-content-center">
                        <div class="col-12 col-lg-8">
                            <h2 class="h1 text-center primary-black" v-text="tableTitle" />
                        </div>
                    </div>


                    <div class="text-center p-0">
                        <table id="total-cost" class="table table-bordered table-responsive bg-light-grey">
                            <thead>
                                <tr class="bg-secondary-green white">
                                    <th class="p-3 p-md-2" rowspan="2">
                                        Lender
                                    </th>
                                    <th class="p-1 p-md-2" rowspan="2">
                                        Loan Amount
                                    </th>
                                    <th class="p-1 p-md-2" rowspan="2">
                                        Term
                                    </th>
                                    <th class="p-1 p-md-2" rowspan="2">
                                        Original<br>APR
                                    </th>
                                    <th class="p-1 p-md-2" rowspan="2">
                                        Repayment
                                    </th>
                                    <th class="p-1 p-md-2" rowspan="2">
                                        Rate<br>Type
                                    </th>

                                    <th class="p-1 py-2 p-md-2" colspan="2">
                                        Monthly payment
                                    </th>

                                    <th class="p-1 p-md-2" rowspan="2">
                                        Cash Back
                                    </th>
                                    <th class="p-1 p-md-2" rowspan="2">
                                        Financing Cost <br> (Minus Cash Back) <a href="javascript:void(0)" data-toggle="tooltip" title="Total interest rate and fees minus cash back" style="color: white;"><i class="fal fa-info-circle"></i></a>
                                    </th>
                                    <th class="p-1 p-md-2" rowspan="2">
                                        Effective APR
                                    </th>
                                </tr>
                                <tr class="bg-secondary-green white">
                                    <th class="p-1 py-2 p-md-2">
                                        In School
                                    </th>
                                    <th class="p-1 py-2 p-md-2">
                                        Out of School
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="! calculating">
                                    <tr class="border-black">
                                        <td class="border-black p-1 p-md-2 py-md-3">Federal Direct</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" v-text="formatCurrency(this.directPlusLoan.loan_amount)" />
                                        <td class="border-black p-1 p-md-2 py-md-3">10 Years</td>
                                        <td class="border-black p-1 p-md-2 py-md-3">N/A <a href="javascript:void(0)" data-toggle="tooltip" title="See assumptions below for interest rate and origination fee. Fed rates are not quoted in APR"><i class="fal fa-info-circle"></i></a></td>
                                        <td class="border-black p-1 p-md-2 py-md-3">Standard Plan</td>
                                        <td class="border-black p-1 p-md-2 py-md-3">Fixed Rate</td>
                                        <td class="border-black p-1 p-md-2 py-md-3">$0</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" v-text="formatCurrency(this.directPlusLoan.after_school)" />
                                        <td class="border-black p-1 p-md-2 py-md-3">$0</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" v-text="formatCurrency(this.directPlusLoan.financing_cost)" />
                                        <td class="border-black p-1 p-md-2 py-md-3" v-text="formatPercentage(this.directPlusLoan.effective_apr)" />
                                    </tr>
                                    <tr class="border-black">
                                        <td class="border-black p-1 p-md-2 py-md-3">Federal Grad Plus</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" v-text="formatCurrency(this.gradPlusLoan.loan_amount)" />
                                        <td class="border-black p-1 p-md-2 py-md-3">10 Years</td>
                                        <td class="border-black p-1 p-md-2 py-md-3">N/A <a href="javascript:void(0)" data-toggle="tooltip" title="See assumptions below for interest rate and origination fee. Fed rates are not quoted in APR"><i class="fal fa-info-circle"></i></a></td>
                                        <td class="border-black p-1 p-md-2 py-md-3">Standard Plan</td>
                                        <td class="border-black p-1 p-md-2 py-md-3">Fixed Rate</td>
                                        <td class="border-black p-1 p-md-2 py-md-3">$0</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" v-text="formatCurrency(this.gradPlusLoan.after_school)" />
                                        <td class="border-black p-1 p-md-2 py-md-3">$0</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" v-text="formatCurrency(this.gradPlusLoan.financing_cost)" />
                                        <td class="border-black p-1 p-md-2 py-md-3" v-text="formatPercentage(this.gradPlusLoan.effective_apr)" />
                                    </tr>
                                    <tr class="border-black">
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;">Combined Federal</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;" v-text="formatCurrency(this.gradPlusLoan.loan_amount + this.directPlusLoan.loan_amount)" />
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;">10 Years</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;">N/A</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;">Standard Plan</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;">Fixed Rate</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;">$0</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;" v-text="formatCurrency(this.gradPlusLoan.after_school + this.directPlusLoan.after_school)" />
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;">$0</td>
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;" v-text="formatCurrency(this.gradPlusLoan.financing_cost + this.directPlusLoan.financing_cost)" />
                                        <td class="border-black p-1 p-md-2 py-md-3" style="border-top-width: 4px; border-bottom-width: 4px;">N/A</td>
                                    </tr>
                                    <tr
                                        v-for="(value, index) in calculatedValues"
                                        :key="index"
                                        class="bg-secondary-off-white">
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="value.title" />
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="loanAmount" />
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="`${value.term} years`" />
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="formatPercentage(value.apr)" />
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="value.repayment" />
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="value.rateType" />
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="formatCurrency(value.inSchool)" />
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="formatCurrency(value.outOfSchool)" />
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="formatCurrency(value.leverEdgeBenefit)" />
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="formatCurrency(value.financing_cost)" />
                                        <td class="border-white p-1 p-md-2 py-md-3" v-text="formatPercentage(value.effective_apr)" />
                                    </tr>
                                </template>
                                <template v-else>
                                    <div class="justify-content-center">
                                        <i class="fa fa-spinner fa-spin fa-3x"></i>
                                    </div>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h5 class="text-center"><a href="https://leveredge.org/variable-forecast" target="_blank">Learn more about our variable assumptions</a></h5>
                    </div>
                </div>
            </div>

            <div class="py-5"></div>
<!--            <template v-for="(value,index) in calculatedValues">-->
<!--                <div class="container" v-if="value.rateType === this.rateTypes.variable_rate" :key="index">-->
<!--                    <div class="row">-->
<!--                        <div class="col-12">-->
<!--                            <table class="table">-->
<!--                                <tr>-->
<!--                                    <td>Date</td>-->
<!--                                    <td>Principal Balance</td>-->
<!--                                    <td>Uncapitalized Interest</td>-->
<!--                                    <td>Payment Amount</td>-->
<!--                                </tr>-->
<!--                                <tr v-for="(transaction, index) in value.transactions" :key="index">-->
<!--                                    <td v-text="transaction.when.toDateString()"></td>-->
<!--                                    <td v-text="formatCurrency(transaction.principal)"></td>-->
<!--                                    <td v-text="formatCurrency(transaction.uncapitalized_interest   )"></td>-->
<!--                                    <td v-text="formatCurrency(transaction.amount)"></td>-->
<!--                                </tr>-->
<!--                            </table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </template>-->


        </div>
        <div class="bg-translucent-green">
            <div class="container">
                <div class="row py-5 calculator-data justify-content-center">
                    <div class="col-12 col-md-8">
                        <h4 class="mb-4">
                            How does this calculator evaluate variable rates?
                        </h4>
                        <p class="mb-3">
                            We use the APR and other details of the loan quote that you enter and convert it into a starting interest rate.
                        </p>
                        <p class="mb-3">
                        Then, we break up the starting interest into two components: the spread and the benchmark.
                        </p>
                        <p class="mb-3">
                        Finally, we adjust your interest rate, each month, for the life of the loan, based on market projections for the benchmark LIBOR rate (downloaded from Bloomberg).
                        </p>
                        <p class="mb-3">
                        You have the added options of swapping out the market projections for more conservative options to see a more conservative view. The “aggressive” assumption assumes +1 Standard Deviation of what the market expects LIBOR to be. The “very aggressive” assumption assumes +2 Standard Deviations higher.
                        </p>
                    </div>
                </div>


                <div class="row py-5 calculator-data justify-content-center">
                    <div class="col-12 col-md-8">
                        <h4 class="mb-4">
                            Assumptions for Private Loans
                        </h4>
                        <p class="mb-3">
                            Assumes interest accrues without capitalization while you are still in school for all but the immediate repayment plan.
                        </p>
                        <p class="mb-3">
                            Assumes interest accrues without capitalization during the grace period.
                        </p>
                        <p class="mb-3">
                            Assumes a 9 month grace period for an Earnest Private Student Loan, Discover, Ascent and College Ave. Assumes a 6 month grace period for all other lenders.
                        </p>
                        <p class="mb-3">
                            Assumes a 2% Origination Fee with CommonBond. Assumes no origination fee for all other lenders.
                        </p>
                        <p class="mb-3">
                            Accrued interest capitalizes upon entering repayment after school and grace period for all but the immediate repayment plan.
                        </p>
                        <p>
                            Assumes you refinance at the end of your grace period or 6 months after you graduate, whichever is later.
                        </p>
                    </div>
                </div>

                <div class="row py-5 calculator-data justify-content-center">
                    <div class="col-12 col-md-8">
                        <h4 class="mb-4">
                            Assumptions for the Federal Loan Option Calculation
                        </h4>
                        <p class="mb-3">
                            4.3% Interest Rate for the First $20,500
                        </p>
                        <p class="mb-3">
                            5.3% Interest Rate for anything above that
                        </p>
                        <p class="mb-3">
                            1.059% Origination Fee for the First $20,500
                        </p>
                        <p class="mb-3">
                            4.236% Origination Fee for anything above that
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import numeral from 'numeral';
    import xirr from 'xirr';
    let timeout;

    export default {
        name:  'CompareMyOptions',
        props: {

        },
        data() {
            return {
                calculatedValues: [
                    // {
                    //     title:            'Federal Options',
                    //     term:             0,
                    //     interest:         null,
                    //     repayment:        null,
                    //     rateType:         null,
                    //     inSchool:         null,
                    //     outOfSchool:      null,
                    //     leverEdgeBenefit: null,
                    //     totalPayments:    null,
                    // },
                ],
                applyAutoPayDiscount: true,
                rateTypes:            {
                    fixed_rate:    'Fixed Rate',
                    variable_rate: 'Variable Rate',
                },
                repaymentTypes:       {
                    fully_deferred: 'Fully Deferred',
                    fixed_payments: 'Fixed Payments',
                    interest_only:  'Interest Only',
                    immediate:      'Immediate',
                },
                yearOfSchoolLefts:   {
                    1: '1 Year',
                    2: '2 Years',
                    3: '3 Years',
                    4: '4 Years',
                },
                variableAssumptions:   {
                    base_case:      'Market Projection',
                    aggressive:      '+1 Standard Deviation',
                    very_aggressive: '+2 Standard Deviation',
                },
                after_graduations: {
                    yes: 'Yes',
                    no:  'No',
                },
                rateType:           'Fixed Rate',
                repaymentType:      'Fully Deferred',
                yearOfSchoolLeft:    2,
                variableAssumption: 'Market Projection',
                after_graduation:   'No',
                loanAmount:         60000,
                lender:             'Earnest',
                years:              10,
                apr:                5.5,

                oneMonthLiborMarket: [
                    0.18788,
                    0.18788,
                    0.20142,
                    0.20249,
                    0.20056,
                    0.17933,
                    0.17176,
                    0.17114,
                    0.17660,
                    0.18038,
                    0.16203,
                    0.14112,
                    0.12839,
                    0.15067,
                    0.14617,
                    0.13592,
                    0.14490,
                    0.13897,
                    0.13138,
                    0.14979,
                    0.14823,
                    0.14495,
                    0.14168,
                    0.13830,
                    0.13482,
                    0.19351,
                    0.19881,
                    0.19992,
                    0.20100,
                    0.20209,
                    0.20321,
                    0.20421,
                    0.20530,
                    0.20636,
                    0.20739,
                    0.20839,
                    0.20947,
                    0.30096,
                    0.31686,
                    0.32327,
                    0.32958,
                    0.33609,
                    0.34259,
                    0.34847,
                    0.35496,
                    0.36123,
                    0.36719,
                    0.37366,
                    0.38011,
                    0.45146,
                    0.47734,
                    0.48732,
                    0.49665,
                    0.50645,
                    0.51622,
                    0.52584,
                    0.53590,
                    0.54452,
                    0.55378,
                    0.56348,
                    0.57317,
                    0.64073,
                    0.66417,
                    0.67630,
                    0.68882,
                    0.70128,
                    0.71236,
                    0.72403,
                    0.73623,
                    0.74722,
                    0.75903,
                    0.77114,
                    0.78210,
                    0.78897,
                    0.79992,
                    0.81066,
                    0.82230,
                    0.83390,
                    0.84512,
                    0.85557,
                    0.86691,
                    0.87765,
                    0.88861,
                    0.89985,
                    0.91055,
                    0.87695,
                    0.88061,
                    0.89084,
                    0.90115,
                    0.91083,
                    0.92096,
                    0.93106,
                    0.94049,
                    0.95054,
                    0.96056,
                    0.96974,
                    0.97974,
                    0.95646,
                    0.96158,
                    0.97076,
                    0.97976,
                    0.98907,
                    0.99828,
                    1.00664,
                    1.01586,
                    1.02453,
                    1.03314,
                    1.04167,
                    1.05049,
                    1.01680,
                    1.01857,
                    1.02685,
                    1.03422,
                    1.04239,
                    1.05046,
                    1.05778,
                    1.06572,
                    1.07319,
                    1.08074,
                    1.08875,
                    1.09669,
                    1.030300,
                    1.036600,
                    1.043600,
                    1.049900,
                    1.056500,
                    1.063600,
                    1.069500,
                    1.076000,
                    1.083100,
                    1.088600,
                    1.082900,
                    1.076700,
                    1.070300,
                    1.076100,
                    1.082500,
                    1.088000,
                    1.093800,
                    1.100000,
                    1.105400,
                    1.111300,
                    1.117200,
                    1.122700,
                    1.087400,
                    1.049900,
                    1.013900,
                    1.018200,
                    1.022300,
                    1.026400,
                    1.030900,
                    1.034900,
                    1.038800,
                    1.043400,
                    1.047100,
                    1.051100,
                    1.055600,
                    1.059300,
                    1.063500,
                    1.067700,
                    1.071600,
                    1.075600,
                    1.079800,
                    1.083700,
                    1.087500,
                    1.091700,
                    1.095500,
                    1.099400,
                    1.103400,
                    1.107200,
                    1.111400,
                    1.115200,
                    1.119000,
                    1.123100,
                    1.126800,
                    1.130700,
                    1.134600,
                    1.138200,
                    1.142000,
                    1.145900,
                    1.105200,
                    1.060500,
                    1.011900,
                    1.014200,
                    1.016700,
                    1.019200,
                    1.021500,
                    1.024100,
                    1.026400,
                    1.028700,
                    1.031300,
                    1.033500,
                    1.035800,
                    1.038300,
                    1.040600,
                    1.042900,
                    1.045400,
                    1.047600,
                    1.049900,
                    1.052400,
                    1.054500,
                    1.056800,
                ],
                oneMonthLiborAggressive: [
                    0.18788,
                    0.18788,
                    0.26564,
                    0.29158,
                    0.31069,
                    0.29971,
                    0.30588,
                    0.31899,
                    0.33192,
                    0.33706,
                    0.30979,
                    0.29681,
                    0.29491,
                    0.36299,
                    0.36405,
                    0.35004,
                    0.37558,
                    0.37331,
                    0.36746,
                    0.41882,
                    0.42141,
                    0.41926,
                    0.41628,
                    0.44789,
                    0.48502,
                    0.70583,
                    0.73529,
                    0.75014,
                    0.76477,
                    0.77908,
                    0.79373,
                    0.80747,
                    0.82189,
                    0.83616,
                    0.84915,
                    0.85787,
                    0.86023,
                    1.08614,
                    1.13729,
                    1.17082,
                    1.20435,
                    1.23841,
                    1.27330,
                    1.30535,
                    1.34067,
                    1.37581,
                    1.40861,
                    1.40645,
                    1.39405,
                    1.48408,
                    1.53893,
                    1.58071,
                    1.62123,
                    1.66265,
                    1.70490,
                    1.74652,
                    1.78976,
                    1.83112,
                    1.87185,
                    1.96960,
                    2.06601,
                    2.25620,
                    2.34339,
                    2.39824,
                    2.45508,
                    2.51023,
                    2.56329,
                    2.61726,
                    2.67318,
                    2.72760,
                    2.78152,
                    2.65569,
                    2.51738,
                    2.33830,
                    2.36557,
                    2.40756,
                    2.45220,
                    2.49530,
                    2.53925,
                    2.57983,
                    2.62383,
                    2.66822,
                    2.70960,
                    2.86252,
                    3.03675,
                    3.14706,
                    3.18439,
                    3.23339,
                    3.28334,
                    3.33022,
                    3.37961,
                    3.42783,
                    3.47573,
                    3.52585,
                    3.57376,
                    3.48891,
                    3.37162,
                    3.21216,
                    3.23188,
                    3.27306,
                    3.31403,
                    3.35549,
                    3.39770,
                    3.43586,
                    3.47834,
                    3.52027,
                    3.55880,
                    3.36196,
                    3.14981,
                    2.91649,
                    2.91045,
                    2.94112,
                    2.97082,
                    3.00165,
                    3.03254,
                    3.06170,
                    3.09302,
                    3.12405,
                    3.15284,
                    3.36443,
                    3.58321,
                    3.530300,
                    3.536600,
                    3.543600,
                    3.549900,
                    3.556500,
                    3.563600,
                    3.569500,
                    3.576000,
                    3.583100,
                    3.588600,
                    3.582900,
                    3.576700,
                    3.570300,
                    3.576100,
                    3.582500,
                    3.588000,
                    3.593800,
                    3.600000,
                    3.605400,
                    3.611300,
                    3.617200,
                    3.622700,
                    3.587400,
                    3.549900,
                    3.513900,
                    3.518200,
                    3.522300,
                    3.526400,
                    3.530900,
                    3.534900,
                    3.538800,
                    3.543400,
                    3.547100,
                    3.551100,
                    3.555600,
                    3.559300,
                    3.563500,
                    3.567700,
                    3.571600,
                    3.575600,
                    3.579800,
                    3.583700,
                    3.587500,
                    3.591700,
                    3.595500,
                    3.599400,
                    3.603400,
                    3.607200,
                    3.611400,
                    3.615200,
                    3.619000,
                    3.623100,
                    3.626800,
                    3.630700,
                    3.634600,
                    3.638200,
                    3.642000,
                    3.645900,
                    3.605200,
                    3.560500,
                    3.511900,
                    3.514200,
                    3.516700,
                    3.519200,
                    3.521500,
                    3.524100,
                    3.526400,
                    3.528700,
                    3.531300,
                    3.533500,
                    3.535800,
                    3.538300,
                    3.540600,
                    3.542900,
                    3.545400,
                    3.547600,
                    3.549900,
                    3.552400,
                    3.554500,
                    3.556800
                ],
                oneMonthLiborVeryAggressive: [
                    0.18788,
                    0.18788,
                    0.32985,
                    0.38066,
                    0.42082,
                    0.42009,
                    0.44000,
                    0.46684,
                    0.48723,
                    0.49374,
                    0.45755,
                    0.45251,
                    0.46142,
                    0.57531,
                    0.58192,
                    0.56417,
                    0.60627,
                    0.60765,
                    0.60354,
                    0.68784,
                    0.69459,
                    0.69356,
                    0.69088,
                    0.75748,
                    0.83521,
                    1.21815,
                    1.27177,
                    1.30036,
                    1.32855,
                    1.35607,
                    1.38425,
                    1.41073,
                    1.43848,
                    1.46596,
                    1.49091,
                    1.50736,
                    1.51100,
                    1.87131,
                    1.95772,
                    2.01838,
                    2.07912,
                    2.14074,
                    2.20402,
                    2.26223,
                    2.32638,
                    2.39039,
                    2.45003,
                    2.43925,
                    2.40799,
                    2.51671,
                    2.60052,
                    2.67410,
                    2.74581,
                    2.81886,
                    2.89358,
                    2.96721,
                    3.04362,
                    3.11771,
                    3.18993,
                    3.37573,
                    3.55884,
                    3.87167,
                    4.02261,
                    4.12018,
                    4.22133,
                    4.31918,
                    4.41421,
                    4.51049,
                    4.61013,
                    4.70799,
                    4.80401,
                    4.54024,
                    4.25267,
                    3.88763,
                    3.93123,
                    4.00446,
                    4.08211,
                    4.15669,
                    4.23339,
                    4.30410,
                    4.38075,
                    4.45879,
                    4.53060,
                    4.82518,
                    5.16295,
                    5.41717,
                    5.48817,
                    5.57594,
                    5.66552,
                    5.74961,
                    5.83825,
                    5.92459,
                    6.01098,
                    6.10115,
                    6.18696,
                    6.00809,
                    5.76349,
                    5.46786,
                    5.50218,
                    5.57536,
                    5.64830,
                    5.72192,
                    5.79713,
                    5.86508,
                    5.94082,
                    6.01601,
                    6.08446,
                    5.68225,
                    5.24912,
                    4.81619,
                    4.80232,
                    4.85539,
                    4.90741,
                    4.96090,
                    5.01463,
                    5.06563,
                    5.12032,
                    5.17492,
                    5.22494,
                    5.64011,
                    6.06973,
                    6.03030,
                    6.03660,
                    6.04360,
                    6.04990,
                    6.05650,
                    6.06360,
                    6.06950,
                    6.07600,
                    6.08310,
                    6.08860,
                    6.08290,
                    6.07670,
                    6.07030,
                    6.07610,
                    6.08250,
                    6.08800,
                    6.09380,
                    6.10000,
                    6.10540,
                    6.11130,
                    6.11720,
                    6.12270,
                    6.08740,
                    6.04990,
                    6.01390,
                    6.01820,
                    6.02230,
                    6.02640,
                    6.03090,
                    6.03490,
                    6.03880,
                    6.04340,
                    6.04710,
                    6.05110,
                    6.05560,
                    6.05930,
                    6.06350,
                    6.06770,
                    6.07160,
                    6.07560,
                    6.07980,
                    6.08370,
                    6.08750,
                    6.09170,
                    6.09550,
                    6.09940,
                    6.10340,
                    6.10720,
                    6.11140,
                    6.11520,
                    6.11900,
                    6.12310,
                    6.12680,
                    6.13070,
                    6.13460,
                    6.13820,
                    6.14200,
                    6.14590,
                    6.10520,
                    6.06050,
                    6.01190,
                    6.01420,
                    6.01670,
                    6.01920,
                    6.02150,
                    6.02410,
                    6.02640,
                    6.02870,
                    6.03130,
                    6.03350,
                    6.03580,
                    6.03830,
                    6.04060,
                    6.04290,
                    6.04540,
                    6.04760,
                    6.04990,
                    6.05240,
                    6.05450,
                    6.05680
                ],

                oneMonthLiborAssumption: null,

                directPlusLoan: {
                    loan_amount:         null,
                    interest_rate:       4.30,
                    origination_fee:     null,
                    in_school:           0,
                    after_school:        null,
                    dont_refinance:      null,
                    refi_after_30_month: null,
                    effective_apr:      null,
                    total_payments:     null,
                },
                gradPlusLoan: {
                    loan_amount:         null,
                    interest_rate:       5.30,
                    origination_fee:     null,
                    in_school:           0,
                    after_school:        null,
                    dont_refinance:      null,
                    refi_after_30_month: null,
                    effective_apr:      null,
                    total_payments:     null,
                },
                calculating: false,
            };
        },
        computed: {
            showVariableAssumption() {
                const filteredArray = this.calculatedValues.filter((calculatedValue) => calculatedValue.rateType === this.rateTypes.variable_rate );
                return filteredArray.length !== 0;
            },
            lenders: function() {
                return {
                    'CommonBond': {
                        name:                       'CommonBond',
                        display_option:             true,
                        fixed_amount:               null,
                        origination_fee_rate:       2,
                        leveredge_reward_rate:      0.5,
                        months_of_grace_period:     6,
                        variable_benchmark:         this.LIBOR_1_MONTH,
                        auto_pay_discount:          0.25,
                        eligible_repayment_types:   [
                            this.repaymentTypes.fully_deferred,
                            this.repaymentTypes.interest_only,
                            this.repaymentTypes.immediate
                        ],
                    },
                    'FederalDirect': {
                        display_option:             false,
                        fixed_amount:               null,
                        origination_fee_rate:       1.059,
                        months_of_grace_period:     6,
                        variable_benchmark:         null,
                        auto_pay_discount:          0,
                        eligible_repayment_types:   [
                            this.repaymentTypes.fully_deferred,
                        ],
                    },
                    'FederalPlus': {
                        display_option:             false,
                        fixed_amount:               null,
                        origination_fee_rate:       4.236,
                        months_of_grace_period:     6,
                        variable_benchmark:         null,
                        auto_pay_discount:          0,
                        eligible_repayment_types:   [
                            this.repaymentTypes.fully_deferred,
                        ],
                    },
                    'Earnest': {
                        name:                       'Earnest',
                        display_option:             true,
                        fixed_amount:               25,
                        origination_fee_rate:       0,
                        leveredge_reward_rate:     0.5,
                        months_of_grace_period:     9,
                        variable_benchmark:         this.LIBOR_1_MONTH,
                        auto_pay_discount:          0.25,
                        eligible_repayment_types:   [
                            this.repaymentTypes.fully_deferred,
                            this.repaymentTypes.fixed_payments,
                            this.repaymentTypes.interest_only,
                            this.repaymentTypes.immediate
                        ],
                    },
                    'Credible': {
                        name:                       'Credible',
                        display_option:             true,
                        fixed_amount:               25,
                        origination_fee_rate:       0,
                        leveredge_reward_rate:      1,
                        months_of_grace_period:     6,
                        variable_benchmark:         this.LIBOR_1_MONTH,
                        auto_pay_discount:          0.25,
                        eligible_repayment_types:   [
                            this.repaymentTypes.fully_deferred,
                            this.repaymentTypes.fixed_payments,
                            this.repaymentTypes.interest_only,
                            this.repaymentTypes.immediate
                        ],
                    },
                    'Sallie Mae': {
                        name:                       'Sallie Mae',
                        display_option:             true,
                        fixed_amount:               25,
                        origination_fee_rate:       0,
                        leveredge_reward_rate:      0,
                        months_of_grace_period:     6,
                        variable_benchmark:         this.LIBOR_1_MONTH,
                        auto_pay_discount:          0.25,
                        eligible_repayment_types:   [
                            this.repaymentTypes.fully_deferred,
                            this.repaymentTypes.fixed_payments,
                            this.repaymentTypes.interest_only,
                            this.repaymentTypes.immediate
                        ],
                    },
                    'SoFi': {
                        name:                       'SoFi',
                        display_option:             true,
                        fixed_amount:               25,
                        origination_fee_rate:       0,
                        leveredge_reward_rate:      0,
                        months_of_grace_period:     6,
                        variable_benchmark:         this.LIBOR_1_MONTH,
                        auto_pay_discount:          0.25,
                        eligible_repayment_types:   [
                            this.repaymentTypes.fully_deferred,
                            this.repaymentTypes.fixed_payments,
                            this.repaymentTypes.interest_only,
                            this.repaymentTypes.immediate
                        ],
                    },
                    'Ascent via Credible': {
                        name:                       'Ascent via Credible',
                        display_option:             true,
                        fixed_amount:               25,
                        origination_fee_rate:       0,
                        leveredge_reward_rate:      1,
                        months_of_grace_period:     9,
                        variable_benchmark:         this.LIBOR_1_MONTH,
                        auto_pay_discount:          0.25,
                        eligible_repayment_types:   [
                            this.repaymentTypes.fully_deferred,
                            this.repaymentTypes.fixed_payments,
                            this.repaymentTypes.interest_only,
                            this.repaymentTypes.immediate
                        ],
                    },
                    'College Ave via Credible': {
                        name:                       'College Ave via Credible',
                        display_option:             true,
                        fixed_amount:               25,
                        origination_fee_rate:       0,
                        leveredge_reward_rate:      1,
                        months_of_grace_period:     9,
                        variable_benchmark:         this.LIBOR_1_MONTH,
                        auto_pay_discount:          0.25,
                        eligible_repayment_types:   [
                            this.repaymentTypes.fully_deferred,
                            this.repaymentTypes.fixed_payments,
                            this.repaymentTypes.interest_only,
                            this.repaymentTypes.immediate
                        ],
                    },
                    'EdvestinU via Credible': {
                        name:                       'EdvestinU via Credible',
                        display_option:             true,
                        fixed_amount:               25,
                        origination_fee_rate:       0,
                        leveredge_reward_rate:      1,
                        months_of_grace_period:     6,
                        variable_benchmark:         this.LIBOR_1_MONTH,
                        auto_pay_discount:          0.25,
                        eligible_repayment_types:   [
                            this.repaymentTypes.fully_deferred,
                            this.repaymentTypes.fixed_payments,
                            this.repaymentTypes.interest_only,
                            this.repaymentTypes.immediate
                        ],
                    },
                    // 'Discover': {
                    //     name:                       'Discover',
                    //     display_option:             true,
                    //     fixed_amount:               25,
                    //     origination_fee_rate:       0,
                    //     leveredge_reward_rate:      1,
                    //     months_of_grace_period:     6,
                    //     variable_benchmark:         this.LIBOR_3_MONTH,
                    //     auto_pay_discount:          0.25,
                    //     eligible_repayment_types:   [
                    //         this.repaymentTypes.fully_deferred,
                    //         this.repaymentTypes.fixed_payments,
                    //         this.repaymentTypes.interest_only,
                    //         this.repaymentTypes.immediate
                    //     ],
                    // },

                }
            },

            tableTitle() {
                return `Total Cost of your Student Loan Options ${this.after_graduation === this.after_graduations.no ? '' : 'until you Refinance'}`;
            },
        },
        mounted() {
            this.lender = this.lenders['Earnest'];
            this.calculateFederal();
        },
        methods: {
            calculateFederal() {

                this.directPlusLoan = {
                    loan_amount:         null,
                    interest_rate:       4.30,
                    origination_fee:     null,
                    in_school:           0,
                    after_school:        null,
                    dont_refinance:      null,
                    refi_after_30_month: null,
                    effective_apr:      null,
                    total_payments:     null,
                };
                this.gradPlusLoan = {
                    loan_amount:         null,
                    interest_rate:       5.30,
                    origination_fee:     null,
                    in_school:           0,
                    after_school:        null,
                    dont_refinance:      null,
                    refi_after_30_month: null,
                    effective_apr:      null,
                    total_payments:     null,
                };

                const direct_loan_limit = 20500;
                const direct_origination_fee_rate = 1.059;
                const plus_origination_fee_rate = 4.236;

                const months_to_repayment = this.yearOfSchoolLeft * 12 + 6;
                const months_to_pay_off = months_to_repayment + 120;

                this.directPlusLoan.loan_amount = Math.min(direct_loan_limit, this.loanAmount);
                this.gradPlusLoan.loan_amount =   Math.max(0, this.loanAmount - direct_loan_limit);

                this.directPlusLoan.origination_fee = this.directPlusLoan.loan_amount * direct_origination_fee_rate / 100;
                this.gradPlusLoan.origination_fee = this.gradPlusLoan.loan_amount * plus_origination_fee_rate / 100;

                const direct_principal = this.directPlusLoan.loan_amount + this.directPlusLoan.origination_fee;
                const plus_principal = this.gradPlusLoan.loan_amount + this.gradPlusLoan.origination_fee;

                const direct_interest_accrued = this.calculateSimpleInterestAccrual(direct_principal, this.directPlusLoan.interest_rate, months_to_repayment);
                const plus_interest_accrued = this.calculateSimpleInterestAccrual(plus_principal, this.gradPlusLoan.interest_rate, months_to_repayment);

                const direct_principal_at_repayment = direct_principal + direct_interest_accrued;
                const plus_principal_at_repayment = plus_principal + plus_interest_accrued;

                if(this.after_graduation === this.after_graduations.yes){
                    this.directPlusLoan.after_school = 'Based on Refi';
                    this.gradPlusLoan.after_school = 'Based on Refi';
                }else{
                    this.directPlusLoan.after_school = -1 * this.PMT(this.directPlusLoan.interest_rate / 12 / 100, 120, direct_principal_at_repayment, null, null);
                    this.gradPlusLoan.after_school = -1 * this.PMT(this.gradPlusLoan.interest_rate / 12 / 100, 120, plus_principal_at_repayment, null, null);
                }


                const direct_plus_transaction = [];
                const grad_plus_transaction = [];

                for (let i = 0; i <= months_to_pay_off; i++) {
                    if (i === 0) {
                        direct_plus_transaction[i] = {amount: -1 * this.directPlusLoan.loan_amount, when: new Date(2010, 1, 1)};
                        grad_plus_transaction[i] = {amount: -1 * this.gradPlusLoan.loan_amount, when: new Date(2010, 1, 1)};
                    } else if (i <= months_to_repayment) {
                        direct_plus_transaction[i] = {amount: 0, when: this.addMonth(direct_plus_transaction[i - 1].when)};
                        grad_plus_transaction[i] = {amount: 0, when: this.addMonth(grad_plus_transaction[i - 1].when)};
                    } else {
                        direct_plus_transaction[i] = {amount: this.directPlusLoan.after_school, when: this.addMonth(direct_plus_transaction[i - 1].when)};
                        grad_plus_transaction[i] = {amount: this.gradPlusLoan.after_school, when: this.addMonth(grad_plus_transaction[i - 1].when)};
                    }
                }

                this.directPlusLoan.dont_refinance = this.getFederalApr(
                    this.directPlusLoan.loan_amount,
                    direct_origination_fee_rate,
                    this.directPlusLoan.interest_rate,
                    10,
                    this.yearOfSchoolLeft
                );

                this.gradPlusLoan.dont_refinance = this.getFederalApr(
                    this.gradPlusLoan.loan_amount,
                    plus_origination_fee_rate,
                    this.gradPlusLoan.interest_rate,
                    10,
                    this.yearOfSchoolLeft
                );

                if(this.after_graduation === this.after_graduations.no) {
                    this.directPlusLoan.total_payments = this.directPlusLoan.after_school * 120;
                    this.gradPlusLoan.total_payments = this.gradPlusLoan.after_school * 120;
                }else{
                    this.directPlusLoan.total_payments = direct_principal_at_repayment;
                    this.gradPlusLoan.total_payments = plus_principal_at_repayment;
                }

                direct_plus_transaction.splice(months_to_repayment + 1);
                direct_plus_transaction[months_to_repayment].amount = direct_principal_at_repayment;
                this.directPlusLoan.refi_after_30_month = this.XIRR(direct_plus_transaction) * 100;

                grad_plus_transaction.splice(months_to_repayment + 1);
                grad_plus_transaction[months_to_repayment].amount = plus_principal_at_repayment;
                this.gradPlusLoan.refi_after_30_month = this.XIRR(grad_plus_transaction) * 100;

                if(this.after_graduation === this.after_graduations.yes){
                    this.directPlusLoan.effective_apr = this.directPlusLoan.refi_after_30_month;
                    this.gradPlusLoan.effective_apr = this.gradPlusLoan.refi_after_30_month;
                }else{
                    this.directPlusLoan.effective_apr = this.directPlusLoan.dont_refinance;
                    this.gradPlusLoan.effective_apr = this.gradPlusLoan.dont_refinance;
                }

                this.directPlusLoan.financing_cost = this.directPlusLoan.total_payments - this.directPlusLoan.loan_amount;
                this.gradPlusLoan.financing_cost = this.gradPlusLoan.total_payments - this.gradPlusLoan.loan_amount;

            },
            getTotalPayments(transactions){
                let transactions_but_first = JSON.parse(JSON.stringify(transactions)).splice(1);
                return _.sumBy(transactions, 'amount');
            },
            getFederalApr(loanAmount, originationFeeRate, interestRate, loanTerm, yearsOfSchoolLeft){
                const months_of_grace_period = 6;
                const months_to_repayment = yearsOfSchoolLeft*12 + months_of_grace_period;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * originationFeeRate / 100;
                const principal = loanAmount + origination_fee;
                const interest_accrued = this.calculateSimpleInterestAccrual(principal, interestRate, months_to_repayment);
                const principal_at_repayment = principal + interest_accrued;
                const monthly_payment = -1 * this.PMT(interestRate / 12 / 100, loanTerm*12, principal_at_repayment, null, null);

                const transactions = [];
                for (let i = 0; i <= months_to_pay_off; i++) {
                    if (i === 0) {
                        transactions[i] = {amount: -1 * loanAmount, when: new Date(2010, 1, 1)};
                    } else if (i <= months_to_repayment) {
                        transactions[i] = {amount: 0, when: this.addMonth(transactions[i - 1].when)};
                    } else {
                        transactions[i] = {amount: monthly_payment, when: this.addMonth(transactions[i - 1].when)};
                    }
                }
                return this.XIRR(transactions)*100;
            },
            runCalculation(index){

                if( this.variableAssumption === this.variableAssumptions.base_case ){
                    this.oneMonthLiborAssumption = this.oneMonthLiborMarket;
                }else if( this.variableAssumption === this.variableAssumptions.aggressive ){
                    this.oneMonthLiborAssumption = this.oneMonthLiborAggressive;
                }else if( this.variableAssumption === this.variableAssumptions.very_aggressive){
                    this.oneMonthLiborAssumption = this.oneMonthLiborVeryAggressive;
                }

                let calculatedValue = this.calculatedValues[index];
                const interest_rate = this.calculateInterestRate(calculatedValue);
                calculatedValue.interest_rate = interest_rate;
                // calculatedValue.origination_fee = calculatedValue.lender.origination_fee_rate * this.loanAmount;

                let transactions;
                switch(calculatedValue.repayment){
                    case this.repaymentTypes.fully_deferred:
                        if(calculatedValue.rateType === this.rateTypes.fixed_rate){
                            transactions = this.getTransactionsForFullyDeferred(calculatedValue.lender, this.yearOfSchoolLeft, calculatedValue.term, this.loanAmount, interest_rate, this.applyAutoPayDiscount);
                        }else{
                            transactions = this.getTransactionsForFullyDeferredVariableRate(calculatedValue.lender, this.yearOfSchoolLeft, calculatedValue.term, this.loanAmount, interest_rate, this.applyAutoPayDiscount);
                        }
                        break;

                    case this.repaymentTypes.fixed_payments:
                        if(calculatedValue.rateType === this.rateTypes.fixed_rate){
                            transactions = this.getTransactionsForFixedPayments(calculatedValue.lender, this.yearOfSchoolLeft, calculatedValue.term, this.loanAmount, interest_rate, this.applyAutoPayDiscount);
                        }else{
                            transactions = this.getTransactionsForFixedPaymentsVariableRate(calculatedValue.lender, this.yearOfSchoolLeft, calculatedValue.term, this.loanAmount, interest_rate, this.applyAutoPayDiscount);
                        }
                        break;

                    case this.repaymentTypes.interest_only:
                        if(calculatedValue.rateType === this.rateTypes.fixed_rate){
                            transactions = this.getTransactionsForInterestOnly(calculatedValue.lender, this.yearOfSchoolLeft, calculatedValue.term, this.loanAmount, interest_rate, this.applyAutoPayDiscount);
                        }else{
                            transactions = this.getTransactionsForInterestOnlyVariableRate(calculatedValue.lender, this.yearOfSchoolLeft, calculatedValue.term, this.loanAmount, interest_rate, this.applyAutoPayDiscount);
                        }
                        break;

                    case this.repaymentTypes.immediate:
                        if(calculatedValue.rateType === this.rateTypes.fixed_rate){
                            transactions = this.getTransactionsForImmediateRepayment(calculatedValue.lender, this.yearOfSchoolLeft, calculatedValue.term, this.loanAmount, interest_rate, this.applyAutoPayDiscount);
                        }else{
                            transactions = this.getTransactionsForImmediateRepaymentVariableRate(calculatedValue.lender, this.yearOfSchoolLeft, calculatedValue.term, this.loanAmount, interest_rate, this.applyAutoPayDiscount);
                        }
                        break;

                    default:
                        throw 'Invalid Repayment Type';
                }

                if(calculatedValue.rateType === this.rateTypes.fixed_rate){
                    calculatedValue.inSchool = transactions[1].amount;
                    if(this.after_graduation === this.after_graduations.yes){
                        calculatedValue.outOfSchool = 'Based on Refi';
                    }else{
                        calculatedValue.outOfSchool = transactions[transactions.length - 2].amount;
                    }
                }else{
                    let months_of_grace_period;
                    let months_to_repayment;
                    let front_transactions;
                    let back_transactions;
                    let transactions_but_first;

                    months_of_grace_period = calculatedValue.lender.months_of_grace_period;
                    months_to_repayment = this.yearOfSchoolLeft*12 + months_of_grace_period;

                    front_transactions = JSON.parse(JSON.stringify(transactions)).splice(1, months_to_repayment);
                    back_transactions = JSON.parse(JSON.stringify(transactions)).slice(months_to_repayment + 1);
                    transactions_but_first = JSON.parse(JSON.stringify(transactions)).splice(1);

                    switch(calculatedValue.repayment){
                        case this.repaymentTypes.fully_deferred:
                            calculatedValue.inSchool = 0;

                            if(this.after_graduation === this.after_graduations.yes){
                                calculatedValue.outOfSchool = 'Based on Refi';
                            }else {
                                calculatedValue.outOfSchool = `${this.formatCurrency(Math.round(_.minBy(back_transactions, 'amount').amount))} - ${this.formatCurrency(Math.round(_.maxBy(back_transactions, 'amount').amount))}`;
                            }
                            break;

                        case this.repaymentTypes.fixed_payments:
                            calculatedValue.inSchool = calculatedValue.lender.fixed_amount;
                            if(this.after_graduation === this.after_graduations.yes){
                                calculatedValue.outOfSchool = 'Based on Refi';
                            }else {
                                calculatedValue.outOfSchool = `${this.formatCurrency(Math.round(_.minBy(back_transactions, 'amount').amount))} - ${this.formatCurrency(Math.round(_.maxBy(back_transactions, 'amount').amount))}`;
                            }
                            break;

                        case this.repaymentTypes.interest_only:
                            calculatedValue.inSchool = `${this.formatCurrency(Math.round(_.minBy(front_transactions, 'amount').amount))} - ${this.formatCurrency(Math.round(_.maxBy(front_transactions, 'amount').amount))}`;
                            if(this.after_graduation === this.after_graduations.yes){
                                calculatedValue.outOfSchool = 'Based on Refi';
                            }else {
                                calculatedValue.outOfSchool = `${this.formatCurrency(Math.round(_.minBy(back_transactions, 'amount').amount))} - ${this.formatCurrency(Math.round(_.maxBy(back_transactions, 'amount').amount))}`;
                            }
                            break;

                        case this.repaymentTypes.immediate:
                            calculatedValue.inSchool = `${this.formatCurrency(Math.round(_.minBy(transactions_but_first, 'amount').amount))} - ${this.formatCurrency(Math.round(_.maxBy(transactions_but_first, 'amount').amount))}`;
                            if(this.after_graduation === this.after_graduations.yes){
                                calculatedValue.outOfSchool = 'Based on Refi';
                            }else {
                                calculatedValue.outOfSchool = `${this.formatCurrency(Math.round(_.minBy(transactions_but_first, 'amount').amount))} - ${this.formatCurrency(Math.round(_.maxBy(transactions_but_first, 'amount').amount))}`;
                            }
                            break;

                        default:
                            throw 'Invalid Repayment Type';
                    }

                }

                // Calculate LeverEdge Benefit
                calculatedValue.leverEdgeBenefit = calculatedValue.lender.leveredge_reward_rate/100 * this.loanAmount;

                if(this.after_graduation === this.after_graduations.yes){
                    // Adjust Transactions to reflect refinancing
                    const months_to_refinance = this.yearOfSchoolLeft*12 + calculatedValue.lender.months_of_grace_period;
                    transactions.splice(months_to_refinance + 2);
                    if( calculatedValue.rateType === this.rateTypes.variable_rate ){
                        transactions[transactions.length - 1].amount =  ( transactions[transactions.length - 2].uncapitalized_interest + transactions[transactions.length - 2].principal );
                    }else{
                        transactions[transactions.length - 1].amount = this.getPrincipalAtRepayment(this.loanAmount, interest_rate, calculatedValue.term, this.yearOfSchoolLeft, calculatedValue.repayment, calculatedValue.lender );
                    }
                }

                let totalPayment = 0;
                transactions.forEach((transaction, index) => {
                    if(index !== 0){
                        totalPayment += transaction.amount;
                    }
                });
                calculatedValue.totalPayments = totalPayment;
                calculatedValue.financing_cost = totalPayment - this.loanAmount - calculatedValue.leverEdgeBenefit;
                transactions[0].amount -= calculatedValue.leverEdgeBenefit;
                calculatedValue.effective_apr = this.XIRR(transactions) * 100;
                calculatedValue.transactions = transactions;

            },
            calculate() {
                this.calculating = true;
                clearTimeout(timeout);
                timeout = setTimeout(() => {

                    try {
                        this.calculateFederal();
                    } catch(err) {
                        // console.debug(err);
                    }

                    this.calculatedValues.forEach( (calculatedValue, index) => this.runCalculation(index) );
                    this.calculating = false;
                }, 700);
            },
            addCalculatedValue() {
                this.calculatedValues.push({
                    apr:              this.apr,
                    term:             this.years,
                    lender:           this.lender,
                    repayment:        this.repaymentType,
                    rateType:         this.rateType,

                    interest:         null,

                    title:            this.lender.name,
                    inSchool:         null,
                    outOfSchool:      null,
                    leverEdgeBenefit: null,
                    totalPayments:    null,
                });
                this.runCalculation(this.calculatedValues.length - 1);
            },
            calculateInterestRate(calculatedValue) {

                let interest_rate_guess = 0.5;
                const increment = 0.001;

                if(!(calculatedValue.apr > 0) || !(this.loanAmount > 0)){
                    return 0;
                }

                let apr = 0;
                let loop = 0;
                while( apr < calculatedValue.apr ){
                    try{
                        apr = this.getApr( this.loanAmount, interest_rate_guess, calculatedValue.term, this.yearOfSchoolLeft, calculatedValue.repayment, calculatedValue.lender );
                    }catch(err){
                        console.log(err);
                    }
                    interest_rate_guess += increment;

                    loop++;
                    if(loop > 20/increment){
                        apr = null;
                        interest_rate_guess = null;
                        break;
                    }
                }

                if(interest_rate_guess !== 0 && interest_rate_guess != null){
                    return interest_rate_guess;
                }else{
                    throw 'Could not compute the interest rate';
                }
            },
            getApr(loanAmount, interestRate, loanTerm, yearsOfSchoolLeft, repaymentType, lender){
                let transactions = null;
                switch(repaymentType){
                    case this.repaymentTypes.fully_deferred:
                        transactions = this.getTransactionsForFullyDeferred(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, this.applyAutoPayDiscount);
                        break;

                    case this.repaymentTypes.fixed_payments:
                        transactions = this.getTransactionsForFixedPayments(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, this.applyAutoPayDiscount);
                        break;

                    case this.repaymentTypes.interest_only:
                        transactions = this.getTransactionsForInterestOnly(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, this.applyAutoPayDiscount);
                        break;

                    case this.repaymentTypes.immediate:
                        transactions = this.getTransactionsForImmediateRepayment(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, this.applyAutoPayDiscount);
                        break;

                    default:
                        throw 'Invalid Repayment Type';
                }

                if(transactions.length < 2){
                    throw 'Too few transactions. Something is wrong';
                }
                return this.XIRR(transactions)*100;
            },
            getTransactionsForFullyDeferredVariableRate(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                const months_of_grace_period = lender.months_of_grace_period;
                const months_to_repayment = yearsOfSchoolLeft*12 + months_of_grace_period;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;
                const spread = interestRate - this.oneMonthLiborAssumption[0];

                let transactions = [];
                for (let i=0; i<= months_to_pay_off; i++){

                    transactions[i] = {};

                    if(i === 0){
                        transactions[i] = {
                            rate: this.oneMonthLiborAssumption[i] + spread,
                            amount: -1 * loanAmount,
                            when: new Date(2010, 1, 1),
                            principal: principal,
                            uncapitalized_interest: 0
                        };
                    }else{
                        // Calculate Interest Rate
                        transactions[i].rate = this.oneMonthLiborAssumption[i] + spread;

                        if(i <= months_to_repayment){
                            transactions[i].amount = 0;
                            transactions[i].when = this.addMonth(transactions[i - 1].when);
                            transactions[i].principal = transactions[i-1].principal;
                            transactions[i].uncapitalized_interest = transactions[i-1].uncapitalized_interest + transactions[i].principal * transactions[i].rate / 12 / 100;
                        }else{
                            // Adjust Rate for Auto Pay Discount (if Applicable)
                            if(applyAutoPayDiscount){
                                transactions[i].rate -= lender.auto_pay_discount;
                            }
                            transactions[i].np = loanTerm*12 - i + months_to_repayment+1;
                            transactions[i].amount =  -1 * this.PMT(transactions[i].rate / 12 / 100, transactions[i].np, (transactions[i-1].principal + transactions[i-1].uncapitalized_interest), null, null);
                            transactions[i].when = this.addMonth(transactions[i - 1].when);
                            transactions[i].uncapitalized_interest = 0;

                            transactions[i].principal = (transactions[i-1].principal + transactions[i-1].uncapitalized_interest) * (1 + transactions[i].rate / 12 / 100) - transactions[i].amount;
                        }
                    }
                }
                return transactions;
            },
            getTransactionsForFixedPaymentsVariableRate(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                const months_of_grace_period = lender.months_of_grace_period;
                const months_to_repayment = yearsOfSchoolLeft*12 + months_of_grace_period;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;
                const spread = interestRate - this.oneMonthLiborAssumption[0];

                let transactions = [];
                for (let i=0; i<= months_to_pay_off; i++){

                    transactions[i] = {};

                    if(i === 0){
                        transactions[i] = {
                            rate: this.oneMonthLiborAssumption[i] + spread,
                            amount: -1 * loanAmount,
                            when: new Date(2010, 1, 1),
                            principal: principal,
                            uncapitalized_interest: 0
                        };
                    }else{
                        // Calculate Interest Rate
                        transactions[i].rate = this.oneMonthLiborAssumption[i] + spread;

                        if(i <= months_to_repayment){
                            if(applyAutoPayDiscount){
                                transactions[i].rate -= lender.auto_pay_discount;
                            }
                            transactions[i].amount = lender.fixed_amount;
                            transactions[i].when = this.addMonth(transactions[i - 1].when);
                            transactions[i].principal = transactions[i-1].principal;
                            transactions[i].uncapitalized_interest = transactions[i-1].uncapitalized_interest + transactions[i].principal * transactions[i].rate / 12 / 100 - transactions[i].amount;

                            if(transactions[i].uncapitalized_interest < 0){
                                transactions[i].principal += transactions[i].uncapitalized_interest;
                                transactions[i].uncapitalized_interest = 0;
                            }

                        }else{
                            // Adjust Rate for Auto Pay Discount (if Applicable)
                            if(applyAutoPayDiscount){
                                transactions[i].rate -= lender.auto_pay_discount;
                            }
                            transactions[i].np = loanTerm*12 - i + months_to_repayment+1;
                            transactions[i].amount =  -1 * this.PMT(transactions[i].rate / 12 / 100, transactions[i].np, (transactions[i-1].principal + transactions[i-1].uncapitalized_interest) , null, null);
                            transactions[i].when = this.addMonth(transactions[i - 1].when);
                            transactions[i].uncapitalized_interest = 0;

                            transactions[i].principal = (transactions[i-1].principal + transactions[i-1].uncapitalized_interest) * (1 + transactions[i].rate / 12 / 100) - transactions[i].amount;
                        }
                    }
                }
                return transactions;
            },
            getTransactionsForInterestOnlyVariableRate(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                const months_of_grace_period = lender.months_of_grace_period;
                const months_to_repayment = yearsOfSchoolLeft*12 + months_of_grace_period;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;
                const spread = interestRate - this.oneMonthLiborAssumption[0];

                let transactions = [];
                for (let i=0; i<= months_to_pay_off; i++){

                    transactions[i] = {};

                    if(i === 0){
                        transactions[i] = {
                            rate: this.oneMonthLiborAssumption[i] + spread,
                            amount: -1 * loanAmount,
                            when: new Date(2010, 1, 1),
                            principal: principal,
                            uncapitalized_interest: 0
                        };
                    }else{
                        // Calculate Interest Rate
                        transactions[i].rate = this.oneMonthLiborAssumption[i] + spread;

                        if(i <= months_to_repayment){
                            if(applyAutoPayDiscount){
                                transactions[i].rate -= lender.auto_pay_discount;
                            }
                            transactions[i].amount = transactions[i-1].principal * transactions[i].rate / 12 / 100;
                            transactions[i].when = this.addMonth(transactions[i - 1].when);
                            transactions[i].principal = transactions[i-1].principal;
                            transactions[i].uncapitalized_interest = 0;
                        }else{
                            // Adjust Rate for Auto Pay Discount (if Applicable)
                            if(applyAutoPayDiscount){
                                transactions[i].rate -= lender.auto_pay_discount;
                            }
                            transactions[i].np = loanTerm*12 - i + months_to_repayment+1;
                            transactions[i].amount =  -1 * this.PMT(transactions[i].rate / 12 / 100, transactions[i].np, (transactions[i-1].principal + transactions[i-1].uncapitalized_interest), null, null);
                            transactions[i].when = this.addMonth(transactions[i - 1].when);
                            transactions[i].uncapitalized_interest = 0;

                            transactions[i].principal = (transactions[i-1].principal + transactions[i-1].uncapitalized_interest) * (1 + transactions[i].rate / 12 / 100) - transactions[i].amount;
                        }
                    }
                }
                return transactions;
            },
            getTransactionsForImmediateRepaymentVariableRate(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                const months_to_repayment = 0;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;
                const principal_at_repayment = principal;
                const spread = interestRate - this.oneMonthLiborAssumption[0];

                const transactions = [];
                for (let i = 0; i <= months_to_pay_off; i++) {
                    if (i === 0) {
                        transactions[i] = {
                            rate: this.oneMonthLiborAssumption[i] + spread,
                            amount: -1 * loanAmount,
                            when: new Date(2010, 1, 1),
                            principal: principal,
                            uncapitalized_interest: 0
                        };
                    } else {
                        transactions[i] = {};
                        // Adjust Rate for Auto Pay Discount (if Applicable)
                        transactions[i].rate = this.oneMonthLiborAssumption[i] + spread;
                        if(applyAutoPayDiscount){
                            transactions[i].rate -= lender.auto_pay_discount;
                        }
                        transactions[i].np = loanTerm*12 - i + months_to_repayment+1;
                        transactions[i].amount =  -1 * this.PMT(transactions[i].rate / 12 / 100, transactions[i].np, (transactions[i-1].principal + transactions[i-1].uncapitalized_interest), null, null);
                        transactions[i].when = this.addMonth(transactions[i - 1].when);
                        transactions[i].uncapitalized_interest = 0;
                        transactions[i].principal = (transactions[i-1].principal + transactions[i-1].uncapitalized_interest) * (1 + transactions[i].rate / 12 / 100) - transactions[i].amount;
                    }
                }
                return transactions;
            },
            getTransactionsForFullyDeferred(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                const months_of_grace_period = lender.months_of_grace_period;
                const months_to_repayment = yearsOfSchoolLeft*12 + months_of_grace_period;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;
                const interest_accrued = this.calculateSimpleInterestAccrual(principal, interestRate, months_to_repayment);
                const principal_at_repayment = principal + interest_accrued;

                if(applyAutoPayDiscount){
                    interestRate -= lender.auto_pay_discount;
                }
                const monthly_payment = -1 * this.PMT(interestRate / 12 / 100, loanTerm*12, principal_at_repayment, null, null);
                const transactions = [];
                for (let i = 0; i <= months_to_pay_off; i++) {
                    if (i === 0) {
                        transactions[i] = {amount: -1 * loanAmount, when: new Date(2010, 1, 1)};
                    } else if (i <= months_to_repayment) {
                        transactions[i] = {amount: 0, when: this.addMonth(transactions[i - 1].when)};
                    } else {
                        transactions[i] = {amount: monthly_payment, when: this.addMonth(transactions[i - 1].when)};
                    }
                }
                return transactions;
            },
            getTransactionsForInterestOnly(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                if(applyAutoPayDiscount){
                    interestRate -= lender.auto_pay_discount;
                }
                const months_of_grace_period = lender.months_of_grace_period;
                const months_to_repayment = yearsOfSchoolLeft*12 + months_of_grace_period;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;
                const payments_during_school = principal * interestRate/12/100;
                const principal_at_repayment = principal;
                const monthly_payment = -1 * this.PMT(interestRate / 12 / 100, loanTerm*12, principal_at_repayment, null, null);
                const transactions = [];
                for (let i = 0; i <= months_to_pay_off; i++) {
                    if (i === 0) {
                        transactions[i] = {amount: -1 * loanAmount, when: new Date(2010, 1, 1)};
                    } else if (i <= months_to_repayment) {
                        transactions[i] = {amount: payments_during_school, when: this.addMonth(transactions[i - 1].when)};
                    } else {
                        transactions[i] = {amount: monthly_payment, when: this.addMonth(transactions[i - 1].when)};
                    }
                }
                return transactions;
            },
            getTransactionsForFixedPayments(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                if(applyAutoPayDiscount){
                    interestRate -= lender.auto_pay_discount;
                }
                const months_of_grace_period = lender.months_of_grace_period;
                const months_to_repayment = yearsOfSchoolLeft*12 + months_of_grace_period;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;

                const interest_accrued_upto_repayment = this.calculateSimpleInterestAccrual(principal, interestRate, months_to_repayment);
                const payments_during_school = lender.fixed_amount;
                const total_payments_upto_repayment = months_to_repayment * payments_during_school;

                const principal_at_repayment = principal + interest_accrued_upto_repayment - total_payments_upto_repayment;
                const monthly_payment = -1 * this.PMT(interestRate / 12 / 100, loanTerm*12, principal_at_repayment, null, null);
                const transactions = [];
                for (let i = 0; i <= months_to_pay_off; i++) {
                    if (i === 0) {
                        transactions[i] = {amount: -1 * loanAmount, when: new Date(2010, 1, 1)};
                    } else if (i <= months_to_repayment) {
                        transactions[i] = {amount: payments_during_school, when: this.addMonth(transactions[i - 1].when)};
                    } else {
                        transactions[i] = {amount: monthly_payment, when: this.addMonth(transactions[i - 1].when)};
                    }
                }
                return transactions;
            },
            getTransactionsForImmediateRepayment(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                if(applyAutoPayDiscount){
                    interestRate -= lender.auto_pay_discount;
                }
                const months_to_repayment = 0;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;
                const principal_at_repayment = principal;
                const monthly_payment = -1 * this.PMT(interestRate / 12 / 100, loanTerm*12, principal_at_repayment, null, null);
                const transactions = [];
                for (let i = 0; i <= months_to_pay_off; i++) {
                    if (i === 0) {
                        transactions[i] = {amount: -1 * loanAmount, when: new Date(2010, 1, 1)};
                    } else {
                        transactions[i] = {amount: monthly_payment, when: this.addMonth(transactions[i - 1].when)};
                    }
                }
                return transactions;
            },
            getPrincipalAtRepayment(loanAmount, interestRate, loanTerm, yearsOfSchoolLeft, repaymentType, lender){
                switch(repaymentType){
                    case this.repaymentTypes.fully_deferred:
                        return this.getPrincipalAtRepaymentForFullyDeferred(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, this.applyAutoPayDiscount);

                    case this.repaymentTypes.fixed_payments:
                        return this.getPrincipalAtRepaymentForFixedPayments(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, this.applyAutoPayDiscount);

                    case this.repaymentTypes.interest_only:
                        return this.getPrincipalAtRepaymentForInterestOnly(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, this.applyAutoPayDiscount);

                    case this.repaymentTypes.immediate:
                        return this.getPrincipalAtRepaymentForImmediateRepayment(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, this.applyAutoPayDiscount);

                    default:
                        throw 'Invalid Repayment Type';
                }
            },
            getPrincipalAtRepaymentForFullyDeferred(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                const months_of_grace_period = lender.months_of_grace_period;
                const months_to_repayment = yearsOfSchoolLeft*12 + months_of_grace_period;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;
                const interest_accrued = this.calculateSimpleInterestAccrual(principal, interestRate, months_to_repayment);
                return principal + interest_accrued;
            },
            getPrincipalAtRepaymentForFixedPayments(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                if(applyAutoPayDiscount){
                    interestRate -= lender.auto_pay_discount;
                }
                const months_of_grace_period = lender.months_of_grace_period;
                const months_to_repayment = yearsOfSchoolLeft*12 + months_of_grace_period;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;

                const interest_accrued_upto_repayment = this.calculateSimpleInterestAccrual(principal, interestRate, months_to_repayment);
                const payments_during_school = lender.fixed_amount;
                const total_payments_upto_repayment = months_to_repayment * payments_during_school;

                return principal + interest_accrued_upto_repayment - total_payments_upto_repayment;
            },
            getPrincipalAtRepaymentForInterestOnly(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                if(applyAutoPayDiscount){
                    interestRate -= lender.auto_pay_discount;
                }
                const months_of_grace_period = lender.months_of_grace_period;
                const months_to_repayment = yearsOfSchoolLeft*12 + months_of_grace_period;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;
                const payments_during_school = principal * interestRate/12/100;
                return principal;
            },
            getPrincipalAtRepaymentForImmediateRepayment(lender, yearsOfSchoolLeft, loanTerm, loanAmount, interestRate, applyAutoPayDiscount){
                if(applyAutoPayDiscount){
                    interestRate -= lender.auto_pay_discount;
                }
                const months_to_repayment = 0;
                const months_to_pay_off = months_to_repayment + loanTerm*12;
                const origination_fee = loanAmount * lender.origination_fee_rate / 100;
                const principal = loanAmount + origination_fee;
                const monthly_payment = -1 * this.PMT(interestRate / 12 / 100, loanTerm*12, principal, null, null);

                const transactions = [];
                for (let i = 0; i <= months_to_pay_off; i++) {
                    if (i === 0) {
                        transactions[i] = {
                            amount: -1 * loanAmount,
                            when: new Date(2010, 1, 1),
                            principal_start_of_month: 0,
                            interest_during_month: 0,
                            principal_end_of_month: principal,
                        };
                    } else {
                        transactions[i] = {};
                        transactions[i].amount = monthly_payment;
                        transactions[i].when = this.addMonth(transactions[i - 1].when);
                        transactions[i].principal_start_of_month = transactions[i - 1].principal_end_of_month;
                        transactions[i].interest_during_month = transactions[i].principal_start_of_month * interestRate/12/100;
                        transactions[i].principal_end_of_month = transactions[i].principal_start_of_month + transactions[i].interest_during_month - transactions[i].amount;
                    }
                }

                let index = yearsOfSchoolLeft*12 + lender.months_of_grace_period + 1 ;
                return transactions[index].principal_start_of_month;
            },

            XIRR(transactions) {
                let return_value = 0;
                try {
                    return_value = xirr(transactions);
                } catch (err) {
                    transactions.forEach((value) => {
                        value.amount = -1 * value.amount;
                    });
                    this.calculating = false;
                    return_value  = xirr(transactions);
                }
                return return_value;
            },
            calculateSimpleInterestAccrual(amount, interest_rate, months) {
                return amount * interest_rate / 100 * months / 12;
            },
            addMonth(date) {
                const old_month = date.getMonth();
                const old_year = date.getFullYear();

                let new_month = old_month + 1;
                let new_year = old_year;

                if (old_month == 12) {
                    new_month = 1;
                    new_year = old_year + 1;
                }

                return new Date(new_year, new_month, 1);
            },
            PMT(ir, np, pv, fv, type) {
                /*
                 * ir   - interest rate per month
                 * np   - number of periods (months)
                 * pv   - present value
                 * fv   - future value
                 * type - when the payments are due:
                 *        0: end of the period, e.g. end of month (default)
                 *        1: beginning of period
                 */
                let pmt; let
                    pvif;

                fv || (fv = 0);
                type || (type = 0);

                if (ir === 0) return -(pv + fv) / np;

                pvif = Math.pow(1 + ir, np);
                pmt = -ir * pv * (pvif + fv) / (pvif - 1);

                if (type === 1) pmt /= (1 + ir);

                return pmt;
            },
            percentageValidation(name, event) {
                if (this[name] && this[name].split('.').length === 2) {
                    if (this[name].split('.')[1].length === 2 && event.key !== 'Backspace') {
                        event.preventDefault();
                    }
                }
            },
            formatCurrency(value) {
                if(Number.isFinite(value)){
                    return numeral(value).format('$0,0');
                }else{
                    return value;
                }

            },
            formatPercentage(value) {
                return numeral(value / 100).format('0.00%');
            },
        },
    };
</script>

<style>
    /*#total-cost th {*/
    /*    font-weight: 600;*/
    /*    font-size: 16px;*/
    /*    border-bottom-width: 1px;*/
    /*}*/
    /*#total-cost td {*/
    /*    font-size: 16px;*/
    /*    min-height: 34px;*/
    /*}*/
    /*@media only screen and (max-width: 768px) {*/
    /*    #total-cost tr {*/
    /*        width: 140px;*/
    /*    }*/
    /*    #total-cost tbody {*/
    /*        display: flex;*/
    /*        width: calc(100% - 140px);*/
    /*        overflow-y: scroll;*/
    /*    }*/
    /*}*/
    .calculator-data p {
        margin-bottom: 0;
    }
</style>
