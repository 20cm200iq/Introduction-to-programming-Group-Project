// Statsbudsjettet 2025 - Real budget data from Prop. 1 S (2024-2025) "Gul bok"
// All amounts in milliarder kroner (mrd kr)
// Source: regjeringen.no/statsbudsjett/2025

const BUDGET_YEAR = 2025;
const POPULATION = 5_550_000; // Approximate Norwegian population 2025

const budgetData = {
    inntekter: {
        name: "Inntekter",
        description: "Statens samlede inntekter",
        total: 2250.0,
        children: [
            {
                name: "Skatter og avgifter",
                icon: "\u{1F3DB}\uFE0F",
                description: "Skatter og avgifter fra Fastlands-Norge",
                value: 1423.3,
                color: "#2d8a4e",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "-17,5 mrd kr netto lettelser",
                    punkter: [
                        "Midlertidig ekstra arbeidsgiveravgift avvikles fra 1.1.2025 \u2013 lettelse p\u00e5 12 mrd kr p\u00e5l\u00f8pt",
                        "MVA p\u00e5 vann og avl\u00f8p redusert fra 25 % til 15 % fra 1. mai 2025 \u2013 sparer husholdninger ca. 1 000 kr/\u00e5r",
                        "Frikortgrensen \u00f8kt fra 70 000 til 100 000 kr; skattefrigrense \u00f8kt til 200 000 kr for l\u00f8nn",
                        "CO\u2082-avgiften \u00f8kt til 1 405 kr/tonn (opptrapping mot 2 000 kr i 2030)"
                    ]
                },
                children: [
                    { name: "Arbeidsgiveravgift og trygdeavgift", value: 466.7, description: "Avgifter betalt av arbeidsgivere og arbeidstakere til folketrygden" },
                    { name: "Skatt p\u00e5 formue og inntekt", value: 435.2, description: "Inntektsskatt og formuesskatt fra personer og selskaper" },
                    { name: "Merverdiavgift (MVA)", value: 409.3, description: "Avgift p\u00e5 omsetning av varer og tjenester" },
                    { name: "Andre avgifter", value: 54.2, description: "\u00d8vrige s\u00e6ravgifter og gebyrer" },
                    { name: "Tobakk- og alkoholavgifter", value: 24.4, description: "S\u00e6ravgifter p\u00e5 tobakksvarer og alkoholholdige drikkevarer" },
                    { name: "Motorvognavgifter", value: 18.8, description: "Engangsavgift, \u00e5rsavgift og vekt\u00e5rsavgift p\u00e5 kj\u00f8ret\u00f8y" },
                    { name: "Elavgift", value: 10.8, description: "Avgift p\u00e5 elektrisk kraft" },
                    { name: "Tollinntekter", value: 3.9, description: "Toll p\u00e5 importerte varer" }
                ]
            },
            {
                name: "Petroleumsinntekter",
                icon: "\u{1F6E2}\uFE0F",
                description: "Statens inntekter fra olje- og gassvirksomheten p\u00e5 norsk sokkel",
                value: 672.4,
                color: "#1a6b35",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "Avhengig av olje-/gasspris",
                    punkter: [
                        "Netto kontantstr\u00f8m p\u00e5 642,8 mrd kr overf\u00f8res i sin helhet til Statens pensjonsfond utland",
                        "CO\u2082-avgiften p\u00e5 sokkelen \u00f8kt med 16 % (+1 155 mill. kr) slik at avgiften er lik p\u00e5 sokkel og fastland",
                        "Oljefondet ansl\u00e5tt til ca. 18 400 mrd kr ved utgangen av 2025"
                    ]
                },
                children: [
                    { name: "Skatt og avgift p\u00e5 utvinning", value: 280.0, description: "S\u00e6rskatt og ordin\u00e6r skatt p\u00e5 petroleumsvirksomhet" },
                    { name: "SD\u00d8E netto kontantstr\u00f8m", value: 252.4, description: "Statens direkte \u00f8konomiske engasjement i petroleumsvirksomheten" },
                    { name: "Utbytte fra Equinor", value: 140.0, description: "Statens utbytte som majoritetsaksjon\u00e6r i Equinor ASA" }
                ]
            },
            {
                name: "Renter og utbytte",
                icon: "\u{1F4C8}",
                description: "Renteinntekter og aksjeutbytte fra statens plasseringer og eierskap",
                value: 87.5,
                color: "#3da362"
            },
            {
                name: "Andre inntekter",
                icon: "\u{1F4CB}",
                description: "\u00d8vrige inntekter inkludert overf\u00f8ring fra Statens pensjonsfond Norge (11,7 mrd)",
                value: 62.2,
                color: "#5bb97d"
            },
            {
                name: "Statlig forretningsdrift",
                icon: "\u{1F3E2}",
                description: "Inntekter fra statlige forretningsvirksomheter",
                value: 4.6,
                color: "#7dcf98"
            }
        ]
    },
    utgifter: {
        name: "Utgifter",
        description: "Statens samlede utgifter",
        total: 2020.8,
        children: [
            {
                name: "Folketrygden",
                icon: "\u{1F91D}",
                description: "Ytelser fra folketrygden \u2013 det norske velferdssystemets grunnpilar",
                value: 701.9,
                color: "#4361a5",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "Kraftig vekst i alderspensjon",
                    punkter: [
                        "Alderspensjon vokser med over 20 mrd kr \u2013 drevet av \u00f8kt antall pensjonister og regulering av grunnbel\u00f8pet",
                        "500 mill. kr mer til arbeidsmarkedstiltak med 5 800 flere tiltaksplasser; 500 nye plasser i varig tilrettelagt arbeid",
                        "Sykepenger og uf\u00f8retrygd \u00f8ker i takt med l\u00f8nnsvekst og \u00f8kt antall mottakere"
                    ]
                },
                children: [
                    { name: "Alderspensjon", value: 335.6, description: "Pensjon til alderspensjonister fra 62 \u00e5r" },
                    { name: "Uf\u00f8retrygd", value: 132.7, description: "Ytelse til personer med varig nedsatt arbeidsevne" },
                    { name: "Sykepenger", value: 71.3, description: "Kompensasjon for bortfall av arbeidsinntekt ved sykdom" },
                    { name: "Arbeidsavklaringspenger", value: 50.8, description: "Ytelse under avklaring av arbeidsevne etter sykdom eller skade" },
                    { name: "Helsetjenester", value: 46.2, description: "Refusjoner til lege, tannlege, fysioterapi og legemidler" },
                    { name: "Foreldrepenger", value: 29.5, description: "Ytelse til foreldre i forbindelse med f\u00f8dsel og adopsjon" },
                    { name: "Andre sosiale form\u00e5l", value: 20.5, description: "Grunn- og hjelpest\u00f8nad, og diverse andre ytelser" },
                    { name: "Arbeidsmarkedstiltak", value: 15.4, description: "Dagpenger og tiltak for arbeidsledige" }
                ]
            },
            {
                name: "Kommuner og fylkeskommuner",
                icon: "\u{1F3D8}\uFE0F",
                description: "Rammetilskudd til kommuner og fylkeskommuner for lokale tjenester som skole, barnehage og eldreomsorg",
                value: 238.4,
                color: "#5a7ec2",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "+6,4 mrd kr frie inntekter",
                    punkter: [
                        "Kommunene f\u00e5r 6,4 mrd kr mer i frie inntekter for \u00e5 styrke velferdstjenestene",
                        "Fylkeskommunene f\u00e5r 1,5 mrd kr ekstra til \u00e5 vedlikeholde fylkesveier",
                        "Rammetilskuddet dekker bl.a. skole, barnehage, eldreomsorg og barnevern"
                    ]
                }
            },
            {
                name: "Sykehus",
                icon: "\u{1F3E5}",
                description: "Bevilgninger til de regionale helseforetakene og spesialisthelsetjenesten",
                value: 228.4,
                color: "#6b8fd0",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "+5,5 mrd kr",
                    punkter: [
                        "Regjeringen styrker sykehusene med 5,5 mrd kr sammenlignet med saldert budsjett 2024",
                        "Satsing p\u00e5 psykisk helse og rusbehandling med \u00f8remerket vekst",
                        "\u00d8kt investeringsramme for nye sykehusbygg og medisinsk utstyr"
                    ]
                },
                children: [
                    { name: "Helse S\u00f8r-\u00d8st RHF", value: 95.0, description: "St\u00f8rste helseregion \u2013 dekker \u00d8stlandet og S\u00f8rlandet" },
                    { name: "Helse Vest RHF", value: 45.0, description: "Dekker Vestland og Rogaland" },
                    { name: "Helse Midt-Norge RHF", value: 35.0, description: "Dekker Tr\u00f8ndelag og M\u00f8re og Romsdal" },
                    { name: "Helse Nord RHF", value: 28.4, description: "Dekker Nord-Norge" },
                    { name: "Fellesform\u00e5l og investeringer", value: 25.0, description: "Felles IKT, utdanning, forskning og investeringer" }
                ]
            },
            {
                name: "Forsvar",
                icon: "\u{1F6E1}\uFE0F",
                description: "Forsvaret av Norge \u2013 \u00f8kt med 15,5 mrd fra 2024 iht. ny langtidsplan",
                value: 110.0,
                color: "#7c9fdd",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "+15,5 mrd kr (+16,4 %)",
                    punkter: [
                        "St\u00f8rste forsvarsl\u00f8ft i nyere tid \u2013 15,5 mrd kr mer enn 2024, i tr\u00e5d med ny langtidsplan",
                        "Norge n\u00e5r NATOs 2 %-m\u00e5l (2,16 % av BNP) \u2013 to \u00e5r f\u00f8r fristen",
                        "Ca. 295 nye \u00e5rsverk, 400 nye vernepliktige og 655 nye reservister; 277 mill. kr til Heimevernet"
                    ]
                }
            },
            {
                name: "Samferdsel",
                icon: "\u{1F686}",
                description: "Vei, jernbane, luftfart og kystforvaltning",
                value: 96.1,
                color: "#8dafea",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "+1,7 mrd kr reelt",
                    punkter: [
                        "Historisk satsing: 46,9 mrd til veg (+3,8 mrd) og 32,6 mrd til jernbane inkl. InterCity og ERTMS",
                        "1,2 mrd kr via Enova til utskifting av tunge kj\u00f8ret\u00f8y til nullutslipp; 7,7 mrd til klimavennlige byomr\u00e5der",
                        "Halverte ferjepriser viderefrres; mer enn dobling av FOT-ruter (kortbanefly) til 2,4 mrd kr"
                    ]
                },
                children: [
                    { name: "Vegform\u00e5l", value: 42.0, description: "Riksveger, fylkesveger og trafikksikkerhet" },
                    { name: "Jernbaneform\u00e5l", value: 36.0, description: "Togdrift, infrastruktur og utbygging" },
                    { name: "Luftfart og kyst", value: 10.1, description: "Avinor, Kystverket og sj\u00f8transport" },
                    { name: "\u00d8vrig samferdsel", value: 8.0, description: "Post, elektronisk kommunikasjon mv." }
                ]
            },
            {
                name: "Utdanning og forskning",
                icon: "\u{1F393}",
                description: "H\u00f8yere utdanning, forskning og studiefinansiering",
                value: 61.4,
                color: "#5171b0",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "T\u00f8ffe kutt i UH-sektoren",
                    punkter: [
                        "Kutt i basisbevilgningen til universiteter og h\u00f8gskoler \u2013 effektiviseringskrav p\u00e5 0,5\u20131 %",
                        "Forskningsr\u00e5dets midler fra NFD kuttet med 5,5 % nominelt (2,138 mrd kr)",
                        "Studiestøtten justert for prisvekst, men studentorganisasjoner mener det ikke er nok"
                    ]
                }
            },
            {
                name: "Bistand og utenriks",
                icon: "\u{1F30D}",
                description: "Internasjonal bistand og utenrikstjeneste",
                value: 48.7,
                color: "#6382be",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "Ca. 1 % av BNI til bistand",
                    punkter: [
                        "Bistandsbudsjettet holdes p\u00e5 rundt 1 % av BNI \u2013 norsk m\u00e5lsetting videref\u00f8res",
                        "Fokus p\u00e5 klimafinansiering, matsikkerhet og humanit\u00e6r bistand til konfliktrammede omr\u00e5der",
                        "Styrking av Norfund med 2 mrd kr ekstra til klimainvesteringsfondet (totalt 3 mrd i 2025)"
                    ]
                }
            },
            {
                name: "Politi og rettsvesen",
                icon: "\u2696\uFE0F",
                description: "Politi, p\u00e5talemyndighet, domstoler og kriminalomsorg",
                value: 55.0,
                color: "#4a6da8",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "+2,8 mrd kr (\u00abGjengpakke 2\u00bb)",
                    punkter: [
                        "\u00abGjengpakke 2\u00bb p\u00e5 2,8 mrd kr \u2013 mer synlig politi, raskere straff og jakt p\u00e5 bakmenn",
                        "405 mill. kr til forebygging av barne- og ungdomskriminalitet i s\u00e6rlig utsatte omr\u00e5der",
                        "Hurtigdomstol for ungdom utvides; 90 mill. kr til bek\u00e6mpelse av \u00f8konomisk kriminalitet"
                    ]
                }
            },
            {
                name: "Petroleumsvirksomhet",
                icon: "\u{1F6E2}\uFE0F",
                description: "Statens utgifter til petroleumssektoren, inkl. SD\u00d8E-investeringer",
                value: 29.6,
                color: "#8097c8",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "Stabil",
                    punkter: [
                        "Utgifter knyttet til SD\u00d8E-investeringer og drift p\u00e5 norsk sokkel",
                        "CO\u2082-avgift p\u00e5 sokkelen \u00f8kt med 16 % for \u00e5 likestille med fastlandsavgiften"
                    ]
                }
            },
            {
                name: "Jordbruk og mat",
                icon: "\u{1F33E}",
                description: "Overf\u00f8ringer etter jordbruksavtalen og matforvaltning",
                value: 28.8,
                color: "#9aadda",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "+2 mrd kr",
                    punkter: [
                        "Jordbruksavtalen styrkes med 2 mrd kr for \u00e5 bedre b\u00f8ndenes inntektsmuligheter",
                        "Satsing p\u00e5 matsikkerhet, beredskapslagring og \u00f8kt norsk matproduksjon"
                    ]
                }
            },
            {
                name: "Barnetrygd og familie",
                icon: "\u{1F46A}",
                description: "Barnetrygd, kontantst\u00f8tte og familiepolitikk",
                value: 35.0,
                color: "#7089c0",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "Prisjustert",
                    punkter: [
                        "Barnetrygden videref\u00f8res p\u00e5 dagens niv\u00e5 med justering for prisvekst",
                        "55 mill. kr til \u00f8kt deltaking for barn og unge i fritidsklubber, korps og idrett"
                    ]
                }
            },
            {
                name: "Kultur og frivillighet",
                icon: "\u{1F3AD}",
                description: "Kultur, idrett, medier og frivillig sektor",
                value: 25.0,
                color: "#8fa5d2",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "+1,2 mrd kr nominelt",
                    punkter: [
                        "Kulturbudsjettet \u00f8ker til 25,8 mrd kr; full momskompensasjon for frivillige organisasjoner (2 650 mill. kr)",
                        "Ny ordning for regionale kulturfond p\u00e5 75 mill. kr; 621 mill. kr til 16 nye nasjonale kulturbygg",
                        "390 mill. kr i momskompensasjon for idrettsanlegg; 55 mill. kr til barn og unges kulturdeltakelse"
                    ]
                }
            },
            {
                name: "Klima og milj\u00f8",
                icon: "\u{1F33F}",
                description: "Klima- og milj\u00f8tiltak, naturforvaltning og forurensning",
                value: 15.0,
                color: "#a4b8e0",
                endringer: {
                    tittel: "Endring fra 2024",
                    verdi: "Betydelig \u00f8kning",
                    punkter: [
                        "Enova styrket til 8,1 mrd kr; 1,2 mrd \u00f8remerket nullutslipp tungtransport; punktutslippsprogrammet +1 mrd (SV-forliket)",
                        "35 mrd kr til st\u00f8tteprogram for flytende havvind (Vestavind F og B); Langskip CCS videref\u00f8rt med 2,1 mrd",
                        "Skogvern p\u00e5 826,5 mill. kr; Klimasats og Natursats tilf\u00f8rt 100 mill. kr ekstra hver"
                    ]
                }
            },
            {
                name: "Renter p\u00e5 statsgjeld",
                icon: "\u{1F4B3}",
                description: "Rentebetalinger p\u00e5 statens innenlandske og utenlandske gjeld",
                value: 16.4,
                color: "#b9cbee"
            },
            {
                name: "Andre statlige form\u00e5l",
                icon: "\u2699\uFE0F",
                description: "Statsforvaltning, digitalisering, n\u00e6ring, bolig, og \u00f8vrige form\u00e5l",
                value: 332.0,
                color: "#748bb8",
                children: [
                    { name: "N\u00e6ringsutvikling og fiskeri", value: 55.0, description: "Innovasjon Norge, n\u00e6ringsrettet forskning og fiskeriforvaltning" },
                    { name: "Bolig og husbanken", value: 40.0, description: "Bost\u00f8tte, startl\u00e5n og boligpolitiske tiltak" },
                    { name: "Arbeid og velferd (admin)", value: 35.0, description: "NAV-administrasjon og arbeidsmarkedstiltak utover folketrygd" },
                    { name: "Statsforvaltning og IKT", value: 30.0, description: "Digitalisering, forvaltning og fellesl\u00f8sninger" },
                    { name: "Annen helse og omsorg", value: 30.0, description: "Helsedirektorat, folkehelse, rusomsorg mv." },
                    { name: "Innvandring og integrering", value: 25.0, description: "UDI, mottak, bosetting og integreringstiltak" },
                    { name: "Barnehager og grunnskole (statlig)", value: 22.0, description: "Statlige tilskudd utover kommunale rammeoverf\u00f8ringer" },
                    { name: "Energi utenom petroleum", value: 15.0, description: "Enova, energiomstilling og nettutbygging" },
                    { name: "\u00d8vrige form\u00e5l", value: 80.0, description: "Diverse tilskudd, reserver og statlige virksomheter" }
                ]
            }
        ]
    },
    metadata: {
        source: "Prop. 1 S (2024\u20132025) Statsbudsjettet / Gul bok",
        year: 2025,
        currency: "NOK",
        unit: "milliarder kroner",
        url: "https://www.regjeringen.no/no/statsbudsjett/2025/",
        note: "Bel\u00f8p er ekskl. l\u00e5netransaksjoner. Petroleumsinntekter/utgifter er inkludert i totalene. Noen underposter er estimater basert p\u00e5 departementenes budsjettprop."
    }
};

// Key figures for the summary bar
const keyFigures = {
    totalInntekter: 2250.0,
    totalUtgifter: 2020.8,
    overskudd: 229.2,
    petroleumInntekter: 672.4,
    petroleumUtgifter: 29.6,
    oljekorrigertUnderskudd: -413.6,
    struktureltUnderskudd: -460.1,
    overforingFraOljefondet: 413.6,
    brukAvFondsmidler: 460.1
};
