var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = CRRao","category":"page"},{"location":"#CRRao","page":"Home","title":"CRRao","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for CRRao.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [CRRao]","category":"page"},{"location":"#CRRao.CRRao","page":"Home","title":"CRRao.CRRao","text":"CRRao is a Julia package that implements the Statistical models. The implementation     of Statistical models become straightforward for most Julia users     with the help of this package. This is going to be wrapper package;    leveraging the strength of wonderful Julia packages that already exists,     such as StatsBase, StatsModels, Distributions,GLM, Turing, DataFrames,    LinearAlgebra, etc.\n\nCRRao is a consistent framework through which callers interact with     a large suite of models. For the end-user, it reduces the cost and complexity     of estimating/training statistical models. It offers convenient guidelines through     which development of additional statistical models can take place     in the future.\n\nWe follow framework which makes contribution to this package easy.\n\nNote: You can read more about Prof C.R. Rao Click Here\n\n\n\n\n\n","category":"module"},{"location":"#CRRao.fitmodel","page":"Home","title":"CRRao.fitmodel","text":"Fit Bayesian Linear Regression with Cauchy Prior with fitmodel\n\n#priors       σ ~ Truncated(TDist(1),0,Inf)       α|σ ~ σTDist(1)       β|σ ~ σTDist(1)\n\nt-distribution with 1 df follows Cauchy distribution\nOn σ we elicite Half-Cauchy distribution (see Gelman 2006)\n\nData model /likelihood\n\n  y ~ MvNormal(α .+ X * β, σ)\n\nsim_size is 10000 (default). In the following example we considered 20000.\n\nJulia> model = fitmodel(@formula(MPG ~ HP + WT+Gear),df,LinearRegression(),Prior_Cauchy(),20000);\n\n┌ Info: Found initial step size    └   ϵ = 0.00078125\n\nJulia> model.summaries    Summary Statistics    parameters      mean       std   naivese      mcse         ess      rhat   essper_sec           Symbol   Float64   Float64    Float64   Float64     Float64   Float64       Float64 \n\n        σ    2.5919    0.3439     0.0024    0.0034   9909.9764    1.0000      771.7449\n        α   30.2828    4.6736     0.0330    0.0677   4769.9124    1.0001      371.4596\n     β[1]   -0.0395    0.0101     0.0001    0.0001   7610.6711    1.0000      592.6852\n     β[2]   -2.8297    0.8653     0.0061    0.0119   5136.0610    1.0000      399.9736\n     β[3]    1.2719    0.8446     0.0060    0.0117   5086.2652    1.0001      396.0957\n\nAll rhat values are close to 1; indicates convergence of Markov Chain.\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-2","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with T-Dist prior using HMC method in Turing\n\npriors\n\nλ ~ InverseGamma(h,h)\nν ~ InverseGamma(h,h)\nβ|λ,ν ~ λ*TDist(ν)  \n\n## Link Function\nz = X*β\n\nprob = Probit.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Probit()                            ,Prior_TDist());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-3","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Uniform prior using HMC method in Turing\n\npriors\n\nv ~ InverseGamma(h,h)\nβ ~ filldist(Uniform(-v,v), p) \n\n## Link Function\nz = X*β\n\nprob = Probit.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Probit()                            ,Prior_Uniform());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-4","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Laplace prior using HMC method in Turing\n\n## priors\nλ ~ InverseGamma(h,h)\nβ ~ Laplace(0,λ)\n\n## Link Function\nz = X*β\n\nprob = Logit.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Logit()                            ,Prior_Laplace());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-5","page":"Home","title":"CRRao.fitmodel","text":"Poisson Regression with Laplace Prior using HMC with Turing\n\n## priors\nλ ~ InverseGamma(h,h)\nα|λ ~ λ * Laplace(0,λ)\nβ|λ ~ λ * Laplace(0,λ)\n\n## Link Function\nz = X*β\n\nμ = exp.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Poisson(μ[i])\nend\n\n```Julia\n\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\n\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)                            , sanction                            , PoissonRegression()                            , Prior_Laplace());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-6","page":"Home","title":"CRRao.fitmodel","text":"NegBinomial Regression with Cauchy Prior\n\n #priors\n λ~InverseGamma(h,h)\n α|λ ~ λ*TDist(1)\n β|λ ~ λ*TDist(1)\n\n ## link\n z = α .+ X * β\n mu = exp.(z)\n\n #likelihood\n for i = 1:n\n   y[i] ~ NegativeBinomial2(mu[i],λ)\n end\n\n h::Float64 = 1.0 (default)\n sim_size::Int64 = 10000 (default)\n\n```Julia\n\nJulia> using RDatasets\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)\n                        , sanction\n                        , NegBinomRegression()\n                        , Prior_Cauchy());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-7","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Laplace prior using HMC method in Turing\n\n## priors\nλ ~ InverseGamma(h,h)\nβ ~ Laplace(0,λ)\n\n## Link Function\nz = X*β\n\nprob = Probit.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Probit()                            ,Prior_Laplace());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-8","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with T-Dist prior using HMC method in Turing\n\npriors\n\nλ ~ InverseGamma(h,h)\nν ~ InverseGamma(h,h)\nβ|λ,ν ~ λ*TDist(ν)  \n\n## Link Function\nz = X*β\n\nprob = Cauchit.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Cauchit()                            ,Prior_TDist());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-9","page":"Home","title":"CRRao.fitmodel","text":"NegBinomial Regression with Laplace Prior\n\n#priors\nλ ~ InverseGamma(h,h)\nα|λ ~ Laplace(0,λ)\nβ|λ ~ Laplace(0,λ)\n\n## link\nz = α .+ X * β\nmu = exp.(z)\n\n#likelihood\nfor i = 1:n\n  y[i] ~ NegativeBinomial2(mu[i],λ)\nend\n\nh::Float64 = 0.1 (default)\nsim_size::Int64 = 10000 (default)\n\n```Julia\n\nJulia> using RDatasets    Julia> sanction = dataset(\"Zelig\", \"sanction\");    Julia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)                            , sanction                            , NegBinomRegression()                            , Prior_Laplace());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-10","page":"Home","title":"CRRao.fitmodel","text":"Poisson Regression with TDist Prior using HMC with Turing\n\n## priors\nλ~InverseGamma(h,h)\nα|ν ~ TDist(ν)*λ\nβ|ν ~ TDist(ν)*λ \n\n## Link Function\nz = X*β\n\nμ = exp.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Poisson(μ[i])\nend\n\n```Julia\n\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\n\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)                            , sanction                            , PoissonRegression()                            , Prior_TDist());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-11","page":"Home","title":"CRRao.fitmodel","text":"Fit Bayesian Linear Regression with Uniform Prior\n\ndistributed Prior with fitmodel\n\n#priors    v=1/h;    σ ~ Uniform(0,v)    α ~ Uniform(-vσ,vσ)    β ~ filldist(Uniform(-v,v), predictors)\n\nData model /likelihood\n\n  y ~ MvNormal(α .+ X * β, σ)\n\nsim_size is 10000 (default).\n\nJulia> model = fitmodel(@formula(MPG ~ HP + WT+Gear),df                            ,LinearRegression()                            ,Prior_Uniform());\n\nCheck if trace-plots are stationary !\n\nJulia> plot(model.chain)\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-12","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Laplace prior using HMC method in Turing\n\n## priors\nλ ~ InverseGamma(h,h)\nβ ~ Laplace(0,λ)\n\n## Link Function\nz = X*β\n\nprob = Cauchit.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Cauchit()                            ,Prior_Laplace());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-13","page":"Home","title":"CRRao.fitmodel","text":"NegBinomial Regression with Uniform Prior\n\nIbrahim and Laud (JASA, 1990) showed that the uniform flat priors \nfor GLM's can lead to improper posterior distributions thus making \nthem undesirable. In such cases, the Markov Chain struggles to converge. \nEven if it converges, results are unreliable.\n\n #priors\n λ~InverseGamma(h,h)\n α|λ ~ Uniform(-λ,λ)\n β|λ ~ Uniform(-λ,λ)\n\n\n ## link\n z = α .+ X * β\n mu = exp.(z)\n\n #likelihood\n for i = 1:n\n   y[i] ~ NegativeBinomial2(mu[i],λ)\n end\n\n h::Float64 = 1.0 (default)\n sim_size::Int64 = 10000 (default)\n\n```Julia\n\nJulia> using RDatasets\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)\n                        , sanction\n                        , NegBinomRegression()\n                        , Prior_Uniform());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-14","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Uniform prior using HMC method in Turing\n\npriors\n\nv ~ InverseGamma(h,h)\nβ ~ filldist(Uniform(-v,v), p) \n\n## Link Function\nz = X*β\n\nprob = Cloglog.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Cloglog()                            ,Prior_Uniform());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-15","page":"Home","title":"CRRao.fitmodel","text":"Poisson Regression with Ridge Prior using HMC with Turing\n\n## priors\nλ ~ InverseGamma(h,h)\nα|λ ~ λ*Normal(0,λ)\nβ|λ ~ λ*Normal(0,λ)\n\n## Link Function\nz = X*β\n\nμ = exp.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Poisson(μ[i])\nend\n\n```Julia\n\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\n\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)                            , sanction                            , PoissonRegression()                            , Prior_Ridge());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-16","page":"Home","title":"CRRao.fitmodel","text":"Fit Bayesian Linear Regression with Ridge Prior with fitmodel\n\nPrior\n\n  v ~ InverseGamma(h,h)\n  σ ~ InverseGamma(a0,b0)\n  α|σ ~ Normal(0,v*σ)\n  β|σ ~ Normal(0,v*σ)\n\n  a0=b0=0.1\n  h=0.01 (Default is 0.01, user can choose other values)\n\nData model /likelihood\n\n  y ~ MvNormal(α .+ X * β, σ)\n\nJulia> model = fitmodel(@formula(MPG ~ HP + WT+Gear),df,LinearRegression(),Prior_Ridge());\n\n┌ Info: Found initial step size    └   ϵ = 0.003125\n\nJulia> model.summaries    Summary Statistics    parameters      mean       std   naivese      mcse         ess      rhat   essper_sec           Symbol   Float64   Float64    Float64   Float64     Float64   Float64       Float64 \n\n        v    6.8184    3.8850     0.0388    0.0680   3316.5165    1.0003      266.6868\n        σ    2.6816    0.3879     0.0039    0.0064   3526.9739    1.0003      283.6100\n        α   28.4108    5.5547     0.0555    0.1075   2390.7583    1.0009      192.2450\n     β[1]   -0.0402    0.0107     0.0001    0.0002   3503.1094    1.0008      281.6910\n     β[2]   -2.6507    0.9780     0.0098    0.0189   2486.6245    1.0008      199.9537\n     β[3]    1.6426    1.0086     0.0101    0.0189   2522.2853    1.0011      202.8213\n\nAll rhat values are close to 1; indicates convergence of Markov Chain.\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-17","page":"Home","title":"CRRao.fitmodel","text":"NegBinomial Regression with TDist Prior\n\n #priors\n λ ~ InverseGamma(h,h)\n ν ~ InverseGamma(h,h)\n α|λ,μ ~ λ*TDist(ν)\n β|λ,μ ~ λ*TDist(ν)\n\n ## link\n z = α .+ X * β\n mu = exp.(z)\n\n #likelihood\n for i = 1:n\n   y[i] ~ NegativeBinomial2(mu[i],λ)\n end\n\n h::Float64 = 1.0 (default)\n sim_size::Int64 = 10000 (default)\n\n```Julia\n\nJulia> using RDatasets\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)\n                        , sanction\n                        , NegBinomRegression()\n                        , Prior_TDist());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-18","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Uniform prior using HMC method in Turing\n\npriors\n\nv ~ InverseGamma(h,h)\nβ ~ filldist(Uniform(-v,v), p) \n\n## Link Function\nz = X*β\n\nprob = Cauchit.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Cauchit()                            ,Prior_Uniform());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-19","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Ridge prior using HMC method in Turing\n\n## priors\nλ ~ InverseGamma(h,h)\nβ ~ Normal(0,λ)  \n\n## Link Function\nz = X*β\n\nprob = Cloglog.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Cloglog()                            ,Prior_Ridge());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-20","page":"Home","title":"CRRao.fitmodel","text":"Poisson Regression with Uniform Prior using HMC with Turing\n\n## priors\nλ~InverseGamma(h,h)\nα ~ Uniform(-λ,λ)\nβ ~ Uniform(-λ,λ)\n\n## Link Function\nz = X*β\n\nμ = exp.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Poisson(μ[i])\nend\n\n```Julia\n\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\n\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)                            , sanction                            , PoissonRegression()                            , Prior_Uniform());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-21","page":"Home","title":"CRRao.fitmodel","text":"Fit Bayesian Linear Regression with t(ν) distributed Prior with fitmodel\n\n#priors       ν ~ InverseGamma(h,h)       σ ~ InverseGamma(a0,b0)       α|σ ~ σTDist(ν)       β|σ ~ σTDist(ν)\n\nt-distribution with ν df follows Cauchy distribution\nOn σ we elicite InverseGamma(a0,b0) distribution (see Gelman 2006)\n\nData model /likelihood\n\n  y ~ MvNormal(α .+ X * β, σ)\n\nsim_size is 10000 (default).\n\nJulia> model = fitmodel(@formula(MPG ~ HP + WT+Gear),df,LinearRegression(),Prior_TDist());\n\n┌ Info: Found initial step size    └   ϵ = 0.0001953125\n\nJulia> model.summaries    Summary Statistics    parameters      mean       std   naivese      mcse         ess      rhat   essper_sec           Symbol   Float64   Float64    Float64   Float64     Float64   Float64       Float64 \n\n        ν    1.0513    0.5599     0.0056    0.0082   5053.9417    1.0000      366.6794\n        σ    2.6200    0.3526     0.0035    0.0050   5835.7064    0.9999      423.3989\n        α   30.2533    4.7311     0.0473    0.0918   2619.3110    1.0006      190.0393\n     β[1]   -0.0394    0.0100     0.0001    0.0001   4267.6480    1.0002      309.6313\n     β[2]   -2.8329    0.8630     0.0086    0.0155   2854.0611    0.9999      207.0711\n     β[3]    1.2791    0.8614     0.0086    0.0165   2659.5009    1.0005      192.9552\n\nAll rhat values are close to 1; indicates convergence of Markov Chain.\n\nWe estimate the posterior estimates of degrees of freedom is 1.0513.\n\nSo posterior distribution of β is close to Cauchy.    Hence it is better to estimate the posterior median. Instead of posterior mean.\n\nJulia> model.quantiles    Quantiles    parameters      2.5%     25.0%     50.0%     75.0%     97.5%           Symbol   Float64   Float64   Float64   Float64   Float64 \n\n        ν    0.3849    0.6656    0.9170    1.2905    2.4945\n        σ    2.0373    2.3724    2.5847    2.8248    3.4096\n        α   20.5143   27.2162   30.2498   33.3969   39.3762\n     β[1]   -0.0591   -0.0460   -0.0394   -0.0328   -0.0199\n     β[2]   -4.5112   -3.4040   -2.8377   -2.2691   -1.0928\n     β[3]   -0.3783    0.7007    1.2674    1.8364    3.0627\n\nCheck if trace-plots are stationary !\n\nplot(model.chain)\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-22","page":"Home","title":"CRRao.fitmodel","text":"Poisson Regression with Cauchy Prior using HMC with Turing\n\n## priors\nλ~InverseGamma(h,h)\nα ~ TDist(1)*λ\nβ ~ filldist(TDist(1)*λ, p)  \n\n## Link Function\nz = X*β\n\nμ = exp.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Poisson(μ[i])\nend\n\n```Julia\n\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\n\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)                            , sanction                            , PoissonRegression()                            , Prior_Cauchy());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-23","page":"Home","title":"CRRao.fitmodel","text":"Fit Bayesian Linear Regression with Laplace Prior with fitmodel\n\nPrior\n\n  v ~ InverseGamma(h,h)\n  σ ~ InverseGamma(a0,b0)\n  α|σ ~ Laplace(0,v*σ)\n  β|σ ~ Laplace(0,v*σ)\n\n  a0=b0=0.1\n  h=0.01 (Default is 0.01, user can choose other values)\n\nData model /likelihood\n\n  y ~ MvNormal(α .+ X * β, σ)\n\nh is 0.01 as Default\n\nsim_size is 10000\n\nJulia> model = fitmodel(@formula(MPG ~ HP + WT+Gear),df,LinearRegression(),Prior_Laplace());\n\nAlternative:\n\nJulia> model = fitmodel(@formula(MPG ~ HP + WT+Gear),df,LinearRegression(),Prior_Laplace(),0.01,10000);\n\n┌ Warning: The current proposal will be rejected due to numerical error(s).    │   isfinite.((θ, r, ℓπ, ℓκ)) = (true, false, false, false)    └ @ AdvancedHMC ~/.julia/packages/AdvancedHMC/w90s5/src/hamiltonian.jl:47    ┌ Info: Found initial step size    └   ϵ = 0.0015625\n\nJulia> model.summaries    Summary Statistics    parameters      mean       std   naivese      mcse         ess      rhat   essper_sec           Symbol   Float64   Float64    Float64   Float64     Float64   Float64       Float64 \n\n        v    4.3206    3.3165     0.0332    0.0567   3115.4478    1.0008      354.1489\n        σ    2.6659    0.3791     0.0038    0.0063   4303.1480    0.9999      489.1609\n        α   29.1723    5.0562     0.0506    0.0843   2889.0590    1.0000      328.4141\n     β[1]   -0.0395    0.0104     0.0001    0.0002   4278.0975    0.9999      486.3132\n     β[2]   -2.7379    0.9098     0.0091    0.0156   2979.1114    0.9999      338.6508\n     β[3]    1.4906    0.9176     0.0092    0.0141   3140.5300    1.0000      357.0001\n\nAll rhat values are close to 1; indicates convergence of Markov Chain.\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-24","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Ridge prior using HMC method in Turing\n\n## priors\nλ ~ InverseGamma(h,h)\nβ ~ Normal(0,λ)  \n\n## Link Function\nz = X*β\n\nprob = Logit.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                   ,turnout,LogisticRegression(),Cauchit());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-25","page":"Home","title":"CRRao.fitmodel","text":"NegBinomial Regression with Ridge Prior\n\n#priors\nλ ~ InverseGamma(h,h)\nα|λ ~ Normal(0,λ)\nβ|λ ~ Normal(0,λ)\n\n## link\nz = α .+ X * β\nmu = exp.(z)\n\n#likelihood\nfor i = 1:n\n  y[i] ~ NegativeBinomial2(mu[i],λ)\nend\n\nh::Float64 = 0.1 (default)\nsim_size::Int64 = 10000 (default)\n```Julia\nJulia> using RDatasets\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)\n                        , sanction\n                        , NegBinomRegression()\n                        , Prior_Ridge());\n\n┌ Info: Found initial step size\n└   ϵ = 0.025\n\nJulia> model.summaries\nSummary Statistics\nparameters      mean       std   naive_se      mcse         ess      rhat   ess_per_sec \n    Symbol   Float64   Float64    Float64   Float64     Float64   Float64       Float64 \n\n        λ    2.0350    0.4392     0.0044    0.0052   7933.2864    1.0000      639.1111\n        α   -1.0802    0.5194     0.0052    0.0082   3565.0359    1.0007      287.2018\n        β[1]   -0.0053    0.1637     0.0016    0.0022   5160.0061    1.0003      415.6937\n        β[2]    1.0617    0.1320     0.0013    0.0017   5259.8195    1.0001      423.7348\n        β[3]   -0.1775    0.5511     0.0055    0.0057   7967.5892    0.9999      641.8746\n        β[4]    1.2770    0.3160     0.0032    0.0038   7812.4049    0.9999      629.3728\n        β[5]    0.1518    0.2839     0.0028    0.0036   6062.4239    1.0006      488.3931\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-26","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Ridge prior using HMC method in Turing\n\n## priors\nλ ~ InverseGamma(h,h)\nβ ~ Normal(0,λ)  \n\n## Link Function\nz = X*β\n\nprob = Cauchit.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Cauchit()                            ,Prior_Ridge());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-27","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Cauchy prior using HMC method in Turing\n\npriors\n\nλ   ~ Truncated(TDist(1),0,Inf) # Half-Cauchy prior\nβ|λ ~ λ*TDist(1)  # Cauchy prior\n\n## Link Function\nz = X*β\n\nprob = Probit.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Probit()                            ,Prior_Cauchy());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-28","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Ridge prior using HMC method in Turing\n\n## priors\nλ ~ InverseGamma(h,h)\nβ ~ Normal(0,λ)\n\n## Link Function\nz = X*β\n\nprob = Probit.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                   ,turnout,LogisticRegression()                   ,Probit(),Prior_Ridge());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-29","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Laplace prior using HMC method in Turing\n\n## priors\nλ ~ InverseGamma(h,h)\nβ ~ Laplace(0,λ)\n\n## Link Function\nz = X*β\n\nprob = Cloglog.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Cloglog()                            ,Prior_Laplace());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-30","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Uniform prior using HMC method in Turing\n\npriors\n\nv ~ InverseGamma(h,h)\nβ ~ filldist(Uniform(-v,v), p) \n\n## Link Function\nz = X*β\n\nprob = Cauchit.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Logit()                            ,Prior_Uniform());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-31","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with T-Dist prior using HMC method in Turing\n\npriors\n\nλ ~ InverseGamma(h,h)\nν ~ InverseGamma(h,h)\nβ|λ,ν ~ λ*TDist(ν)  \n\n## Link Function\nz = X*β\n\nprob = Cloglog.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Cloglog()                            ,Prior_TDist());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-32","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Cauchy prior using HMC method in Turing\n\npriors\n\nλ   ~ Truncated(TDist(1),0,Inf) # Half-Cauchy prior\nβ|λ ~ λ*TDist(1)  # Cauchy prior\n\n## Link Function\nz = X*β\n\nprob = Logit.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Logit()                            ,Prior_Cauchy());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-33","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Cauchy prior using HMC method in Turing\n\npriors\n\nλ   ~ Truncated(TDist(1),0,Inf) # Half-Cauchy prior\nβ|λ ~ λ*TDist(1)  # Cauchy prior\n\n## Link Function\nz = X*β\n\nprob = Cauchit.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Cauchit()                            ,Prior_Cauchy());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-34","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Cauchy prior using HMC method in Turing\n\npriors\n\nλ   ~ Truncated(TDist(1),0,Inf) # Half-Cauchy prior\nβ|λ ~ λ*TDist(1)  # Cauchy prior\n\n## Link Function\nz = X*β\n\nprob = Cloglog.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Cloglog()                            ,Prior_Cauchy());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-35","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with T-Dist prior using HMC method in Turing\n\npriors\n\nλ ~ InverseGamma(h,h)\nν ~ InverseGamma(h,h)\nβ|λ,ν ~ λ*TDist(ν)  \n\n## Link Function\nz = X*β\n\nprob = Logit.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                            ,turnout                            ,LogisticRegression()                            ,Logit()                            ,Prior_TDist());\n\n```\n\n\n\n\n\n","category":"function"},{"location":"#CRRao.fitmodel-Tuple{StatsModels.FormulaTerm, DataFrames.DataFrame, LinearRegression}","page":"Home","title":"CRRao.fitmodel","text":"Fit OLS Linear Regression with fitmodel\n\nTo fit linear regression with likelihood method, provide the following\n\nthree information in fitmodel\n\nformula Provide the equation. Eg. @formula(y~x1+x2+...)\ndata Provide training data as DataFrame`\nmodelClass  : LinearRegression()\n\n```Julia\n\nJulia> using RDatasets, StatsModels, StatsPlots\n\nJulia> df = dataset(\"datasets\", \"mtcars\");\n\nJulia> model = fitmodel(@formula(MPG ~ HP + WT+Gear),df,LinearRegression());\n\nJulia> model.fit\n\n────────────────────────────────────────────────────────────────────────────                      Coef.  Std. Error      t  Pr(>|t|)   Lower 95%   Upper 95%    ────────────────────────────────────────────────────────────────────────────    (Intercept)  32.0137     4.63226      6.91    <1e-06  22.5249     41.5024    HP           -0.0367861  0.00989146  -3.72    0.0009  -0.0570478  -0.0165243    WT           -3.19781    0.846546    -3.78    0.0008  -4.93188    -1.46374    Gear          1.01998    0.851408     1.20    0.2410  -0.72405     2.76401    ────────────────────────────────────────────────────────────────────────────\n\nFitted model returns following informations\n\nJulia> model.sigma    2.5741691724978977\n\nJulia> model.LogLike    -73.52638935960971\n\nJulia> model.AIC    157.05277871921942\n\nJulia> model.BIC    164.38145823321804\n\nJulia> model.R_sqr    0.8352309600685555\n\nJulia> model.AdjustedRsqr    0.8175771343616149\n\nJulia> model.fittedResponse    32-element Vector{Float64}:    23.66884995233871    22.85340824320635    25.25355614074087    20.746171762311327    17.635570543830113    ...\n\nJulia> model.residuals    32-element Vector{Float64}:    -2.668849952338711    -1.8534082432063492    -2.4535561407408686    0.6538282376886713    ...\n\nJulia> model.Cooks_distance    32-element Vector{Float64}:    0.013342034282302845    0.00688728266731234    0.015495847517058972    ...\n\nJulia> plot(model.Cooks_distance)    ```\n\n\n\n\n\n","category":"method"},{"location":"#CRRao.fitmodel-Tuple{StatsModels.FormulaTerm, DataFrames.DataFrame, LogisticRegression, Cauchit}","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Cauchit link : GLM with Scoring Method\n\n## Link Function\nz = X*β\n\nprob = Cauchit.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n  Julia> turnout = dataset(\"Zelig\", \"turnout\")\n\n  Julia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)\n                 ,turnout,LogisticRegression(),Cauchit());\n  Julia> model.fit\n\n  ────────────────────────────────────────────────────────────────────────────\n                    Coef.  Std. Error      z  Pr(>|z|)   Lower 95%   Upper 95%\n  ────────────────────────────────────────────────────────────────────────────\n  (Intercept)  -3.16889    0.384429    -8.24    <1e-15  -3.92235    -2.41542\n  Age           0.0304105  0.00413473   7.35    <1e-12   0.0223066   0.0385144\n  Race: white   0.181839   0.144766     1.26    0.2091  -0.101898    0.465576\n  Income        0.235267   0.038152     6.17    <1e-09   0.16049     0.310043\n  Educate       0.169276   0.0240098    7.05    <1e-11   0.122217    0.216334\n  ────────────────────────────────────────────────────────────────────────────\n\n```\n\n\n\n\n\n","category":"method"},{"location":"#CRRao.fitmodel-Tuple{StatsModels.FormulaTerm, DataFrames.DataFrame, LogisticRegression, Cloglog}","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with CloglogLink link : GLM with Scoring Method\n\n## Link Function\nz = X*β\n\nprob = CloglogLink.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia    Julia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                   ,turnout,LogisticRegression(),Cloglog());    Julia> model.fit\n\n─────────────────────────────────────────────────────────────────────────────                      Coef.  Std. Error       z  Pr(>|z|)   Lower 95%   Upper 95%    ─────────────────────────────────────────────────────────────────────────────    (Intercept)  -1.94617    0.184123    -10.57    <1e-25  -2.30704    -1.58529    Age           0.0147857  0.00184088    8.03    <1e-15   0.0111776   0.0183937    Race: white   0.185139   0.087101      2.13    0.0335   0.014424    0.355854    Income        0.0768268  0.0126411     6.08    <1e-08   0.0520506   0.101603    Educate       0.0983976  0.0108857     9.04    <1e-18   0.077062    0.119733    ─────────────────────────────────────────────────────────────────────────────    ```\n\n\n\n\n\n","category":"method"},{"location":"#CRRao.fitmodel-Tuple{StatsModels.FormulaTerm, DataFrames.DataFrame, LogisticRegression, Logit}","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Logit link : GLM with Scoring Method\n\n## Link Function\nz = X*β\n\nprob = Logit.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```        Julia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                   ,turnout,LogisticRegression(),Logit());\n\nJulia> model.fit\n\n────────────────────────────────────────────────────────────────────────────                      Coef.  Std. Error      z  Pr(>|z|)   Lower 95%   Upper 95%    ────────────────────────────────────────────────────────────────────────────    (Intercept)  -3.03426    0.325927    -9.31    <1e-19  -3.67307    -2.39546    Age           0.0283543  0.00346034   8.19    <1e-15   0.0215722   0.0351365    Race: white   0.250798   0.146457     1.71    0.0868  -0.0362521   0.537847    Income        0.177112   0.0271516    6.52    <1e-10   0.123896    0.230328    Educate       0.175634   0.0203308    8.64    <1e-17   0.135786    0.215481    ────────────────────────────────────────────────────────────────────────────\n\nJulia> model.LogLike    -1011.9906318515576\n\nJulia> model.AIC    2033.9812637031152\n\nJulia> model.BIC    2061.985776000826    ```\n\n\n\n\n\n","category":"method"},{"location":"#CRRao.fitmodel-Tuple{StatsModels.FormulaTerm, DataFrames.DataFrame, LogisticRegression, Probit}","page":"Home","title":"CRRao.fitmodel","text":"Logistic Regression with Probit link : GLM with Scoring Method\n\n## Link Function\nz = X*β\n\nprob = Probit.(z)\n\n#likelihood\nfor i = 1:n\n    y[i] ~ Bernoulli(prob[i])\nend\n\n```Julia\n\nJulia> turnout = dataset(\"Zelig\", \"turnout\")\n\nJulia> model = fitmodel(@formula(Vote ~ Age + Race +Income + Educate)                   ,turnout,LogisticRegression(),Probit());    Julia> model.fit\n\n────────────────────────────────────────────────────────────────────────────                      Coef.  Std. Error      z  Pr(>|z|)   Lower 95%   Upper 95%    ────────────────────────────────────────────────────────────────────────────    (Intercept)  -1.76141    0.188556    -9.34    <1e-20  -2.13097    -1.39185    Age           0.0164973  0.00199897   8.25    <1e-15   0.0125794   0.0204152    Race: white   0.162856   0.0876885    1.86    0.0633  -0.0090108   0.334722    Income        0.0963117  0.0149675    6.43    <1e-09   0.066976    0.125647    Educate       0.10417    0.0116713    8.93    <1e-18   0.0812949   0.127046    ────────────────────────────────────────────────────────────────────────────    ```\n\n\n\n\n\n","category":"method"},{"location":"#CRRao.fitmodel-Tuple{StatsModels.FormulaTerm, DataFrames.DataFrame, NegBinomRegression}","page":"Home","title":"CRRao.fitmodel","text":"NegBinomial Regression - Likelihood method\n\n ## link\n z = α .+ X * β\n mu = exp.(z)\n\n #likelihood\n for i = 1:n\n   y[i] ~ NegativeBinomial2(mu[i],λ)\n end\n\n```Julia\n\nJulia> using RDatasets\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)\n                        , sanction\n                        , NegBinomRegression());\n\n```\n\n\n\n\n\n","category":"method"},{"location":"#CRRao.fitmodel-Tuple{StatsModels.FormulaTerm, DataFrames.DataFrame, PoissonRegression}","page":"Home","title":"CRRao.fitmodel","text":"Poisson Regression - Likelihood Method\n\n## Link Function\nz = X*β\n\nμ = exp.(z)\n\n## likelihood\nfor i = 1:n\n    y[i] ~ Poisson(μ[i])\nend\n\n```Julia\n\nJulia> sanction = dataset(\"Zelig\", \"sanction\");\n\nJulia> model = fitmodel(@formula(Num ~ Target + Coop + NCost)                            , sanction                            , PoissonRegression());\n\n```\n\n\n\n\n\n","category":"method"}]
}
