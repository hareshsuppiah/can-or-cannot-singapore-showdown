const SRC = {
  roots: 'https://www.roots.gov.sg/ich-landing/ich/hawker-culture',
  food: 'https://www.visitsingapore.com/things-to-do/dining/local-food-and-drinks/',
  singlish: 'https://www.nlb.gov.sg/main/article-detail?cmsuuid=5d5de338-98c5-4a97-9b51-727e807d6507',
  symbols: 'https://www.nhb.gov.sg/what-we-do/our-work/community-engagement/education/resources/national-symbols',
  history: 'https://www.nlb.gov.sg/main/site/learnx/learnx-singapore/adults/national-symbols',
  unesco: 'https://ich.unesco.org/en/RL/hawker-culture-in-singapore-community-dining-and-culinary-practices-in-a-multicultural-urban-context-01568',
  cuisine: 'https://www.roots.gov.sg/stories-landing/stories/Serving-Up-a-Legacy',
  language: 'https://www.languagecouncils.sg/goodenglish/resources/singlish-words',
  gov: 'https://www.mccy.gov.sg/sectors/resilience-and-engagement/national-identity-and-symbols/'
};

const q = (question, options, answer, explain, source='food') => ({ q: question, options, answer, explain, source: SRC[source] });

export const rounds = [
  {
    title: 'Hawker 101',
    description: 'The basics. Stalls, drinks and the sacred art of not losing your table.',
    questions: [
      q('What does it mean when a table is “chope-d” with a tissue packet?', ['It needs cleaning','It is reserved','Free tissues for all','The stall is closed'],1,'“Chope” means to reserve. A humble tissue packet can carry the authority of a velvet rope.','singlish'),
      q('Singapore’s hawker culture joined UNESCO’s intangible heritage list in which year?', ['2015','2018','2020','2023'],2,'UNESCO inscribed Hawker Culture in Singapore in 2020.','unesco'),
      q('At a drinks stall, what is kopi?', ['Tea','Coffee','Chocolate malt','Barley water'],1,'Kopi is coffee, typically brewed through a cloth sock and commonly served with condensed milk.','food'),
      q('What does “kopi O” remove from ordinary kopi?', ['Coffee','Sugar','Milk','Ice'],2,'“O” means no milk. Unless you add “kosong”, sugar remains.','food'),
      q('What does “kosong” mean in a drink order?', ['Extra strong','No sugar','Takeaway','With ice'],1,'Kosong means empty: in this context, no sugar. Kopi O kosong is black coffee without sugar.','food'),
      q('What is the usual base of Hainanese chicken rice?', ['Coconut rice','Rice cooked with chicken stock and aromatics','Fried glutinous rice','Plain basmati'],1,'The rice is typically cooked with chicken stock, fat and aromatics—very much not a background extra.','cuisine'),
      q('What arrives when you order “teh tarik”?', ['Tea pulled between vessels','Tea with lime','Frozen tea','Herbal tea'],0,'Teh tarik means “pulled tea”, aerated by pouring it repeatedly between containers.','food'),
      q('A hawker centre is best described as…', ['One giant restaurant','A food hall of independent stalls','A supermarket tasting room','A hotel buffet'],1,'Hawker centres bring many independent cooked-food and drink stalls into a shared dining space.','roots'),
      q('What is “dabao” or “da bao”?', ['Eat slowly','Make it spicier','Pack it to take away','Split the bill'],2,'Da bao means to pack food for takeaway. Useful when your stomach says cannot but your heart says can.','singlish'),
      q('Which dish is traditionally served on skewers?', ['Satay','Laksa','Bak kut teh','Char kway teow'],0,'Satay is seasoned meat grilled on skewers, commonly served with peanut sauce.','cuisine'),
      q('What is sambal?', ['A sweet custard','A chilli-based condiment','A rice cake','A coffee filter'],1,'Sambal is a chilli-based condiment with many regional variations. Tiny spoon; large consequences.','food'),
      q('What does “zi char” refer to?', ['A coffee order','Cooked-to-order shared dishes','Vegetarian desserts','Breakfast toast only'],1,'Zi char stalls serve a broad menu of cooked-to-order dishes, usually for sharing.','food'),
      q('Which is a classic kaya-toast companion?', ['Soft-boiled eggs','Mashed potato','Mango sorbet','Tomato soup'],0,'Kaya toast is commonly paired with soft-boiled eggs and kopi or tea.','food'),
      q('Kaya is primarily a spread made with…', ['Coconut, egg and sugar','Peanut and sesame','Banana and honey','Soybean and salt'],0,'Kaya is a sweet coconut-and-egg jam, often scented with pandan.','food'),
      q('What is “kopitiam” most closely translated as?', ['Coffee shop','Wet market','Train station','Night club'],0,'Kopi is Malay for coffee and tiam is Hokkien for shop. Language rojak, concept perfect.','singlish'),
      q('What is a “wet market”?', ['A market that opens only in rain','A market selling fresh meat, fish and produce','A waterpark with snacks','A drinks-only hawker centre'],1,'Wet markets traditionally sell fresh produce, meat and seafood; floors may be washed frequently.','roots'),
      q('Which utensil pairing is common for rice and noodle dishes?', ['Knife and fork only','Spoon and chopsticks','Tongs and ladle','Hands and whisk'],1,'A spoon-and-chopsticks pairing is common at hawker tables. Use whichever gets lunch to mouth safely.','food'),
      q('What is “kopi peng”?', ['Hot black coffee','Iced coffee','Coffee with butter','Coffee jelly'],1,'Peng means ice, so kopi peng is iced coffee.','singlish'),
      q('Why were many purpose-built hawker centres created from the 1970s?', ['To replace hotel restaurants','To resettle street hawkers','To host cooking contests','To sell only tourist food'],1,'Purpose-built centres helped resettle itinerant street hawkers and improve sanitation and infrastructure.','roots'),
      q('The safest meaning of “hawker culture” is…', ['Only the recipes','Food, people, spaces and shared dining practices','A single famous market','Cheap food for visitors'],1,'It includes culinary practices, skills, community dining, social spaces and transmission across generations.','unesco')
    ]
  },
  {
    title: 'What’s in it?',
    description: 'Ingredient detective work. Please do not accuse the laksa before hearing the evidence.',
    questions: [
      q('What is the “carrot” in Singaporean carrot cake?', ['Actual carrot','White radish','Sweet potato','Pumpkin'],1,'The dish uses steamed radish cake—commonly called carrot cake locally—fried with egg and preserved radish.','food'),
      q('What gives nasi lemak rice its signature richness?', ['Chicken stock','Coconut milk','Peanut oil','Cheese'],1,'Nasi lemak literally points to rich or creamy rice, traditionally cooked with coconut milk.','food'),
      q('What is the defining noodle in char kway teow?', ['Flat rice noodles','Angel-hair pasta','Buckwheat soba','Glass vermicelli only'],0,'Kway teow are flat rice noodles, stir-fried over high heat with savoury ingredients.','food'),
      q('What flavours the gravy in many versions of satay bee hoon?', ['Peanut sauce','Tomato ketchup','Cheese sauce','Black coffee'],0,'Satay bee hoon pairs rice vermicelli and ingredients with a spiced peanut gravy.','food'),
      q('What is pandan?', ['A fragrant tropical leaf','A dried fish','A chilli paste','A rice noodle'],0,'Pandan leaves add a grassy, vanilla-like fragrance to sweets, rice and drinks.','cuisine'),
      q('The black colour of grass jelly comes from…', ['Chocolate','A herbal plant preparation','Squid ink','Black sesame only'],1,'Grass jelly is made from plant material and has a mild herbal character—not from chocolate, sorry.','food'),
      q('What is the “tulang” in sup tulang?', ['Bone','Noodle','Leaf','Egg'],0,'Tulang means bone; the vivid red soup is famous for mutton bones and marrow.','cuisine'),
      q('What is otak-otak usually made from?', ['Spiced fish paste','Sweet bean paste','Mashed potato','Coffee grounds'],0,'Otak-otak is a seasoned fish paste parcel, commonly grilled in leaf wrapping.','food'),
      q('What is the base of a classic thosai?', ['Fermented rice and lentil batter','Wheat and cheese dough','Cornmeal','Mashed cassava only'],0,'Thosai is a South Indian crepe made from a fermented rice-and-lentil batter.','cuisine'),
      q('What gives chendol its green strands?', ['Pandan colouring and rice-flour-style jelly','Spinach pasta','Green tea noodles','Avocado'],0,'The green jelly strands are traditionally pandan-flavoured and served with coconut milk and palm sugar.','food'),
      q('What is gula melaka?', ['Palm sugar','Fish sauce','Rice vinegar','Black pepper'],0,'Gula melaka is palm sugar, prized for its deep caramel flavour.','food'),
      q('Which ingredient is central to rojak sauce?', ['Prawn paste','Mayonnaise','Maple syrup','Coffee'],0,'Many Singapore-style rojak sauces use fermented prawn paste, balanced with sweet, sour and spicy notes.','cuisine'),
      q('Bak kut teh literally translates closest to…', ['Meat bone tea','Pepper rice','Pork noodle','Herbal coffee'],0,'The name means “meat bone tea”, although the dish itself is a pork-rib soup.','food'),
      q('What is bee hoon?', ['Rice vermicelli','Egg custard','Wheat bun','Soy pudding'],0,'Bee hoon is thin rice vermicelli. It appears fried, soupy and everywhere in between.','food'),
      q('What is tau huay?', ['Soybean pudding','Fried carrot cake','Coconut rice','Fish porridge'],0,'Tau huay is a soft soybean pudding, served warm or chilled with syrup.','food'),
      q('What makes “Milo Dinosaur” a dinosaur?', ['A mound of extra Milo powder','A toy dinosaur','Durian ice cream','It is two litres'],0,'It is an iced Milo drink topped with a conspicuous heap of Milo powder. Extinction not included.','food'),
      q('What usually colours and flavours bandung?', ['Rose syrup','Coffee','Lime juice','Soy sauce'],0,'Bandung combines rose syrup and milk into a sweet pink drink.','food'),
      q('What seafood gives Hokkien mee much of its stock flavour?', ['Prawns','Tuna','Salmon','Oysters only'],0,'Singapore Hokkien mee commonly uses a prawn-and-pork stock with noodles and seafood.','food'),
      q('What is commonly inside popiah?', ['Braised turnip and vegetables','Ice cream only','Curry noodles','Roast chicken and chips'],0,'Fresh popiah wraps a savoury braised turnip filling with vegetables and condiments.','food'),
      q('What is the defining fruit in durian pengat?', ['Durian','Mango','Lychee','Pineapple'],0,'Durian pengat is a rich durian dessert, often enriched with coconut milk and palm sugar. Easy one, can?','food')
    ]
  },
  {
    title: 'Singlish, can?',
    description: 'Translate the mood, not just the words. Tone can change everything, lah.',
    questions: [
      q('If someone says “Can!”, what do they usually mean?', ['Maybe next year','Yes, possible','Absolutely forbidden','I did not hear you'],1,'“Can” is a compact affirmative: yes, it is possible or acceptable.','singlish'),
      q('“Cannot” most directly means…', ['No / not possible','Please repeat','Very delicious','Go faster'],0,'Economical, efficient, no committee meeting required: cannot.','singlish'),
      q('What does “lah” usually do?', ['Names a person','Adds emphasis or social tone','Makes a sentence past tense','Means lunch'],1,'Lah is a discourse particle; its effect depends on tone and context rather than a single dictionary translation.','singlish'),
      q('“Shiok” means something is…', ['Extremely satisfying or delicious','Legally required','Very expensive','Slightly wet'],0,'Shiok expresses pleasure or satisfaction, especially with good food or a pleasing experience.','language'),
      q('If someone is “blur”, they are…', ['Confused or unaware','Very athletic','Angry and shouting','Wearing blue'],0,'Blur describes someone confused, slow to catch on or not fully aware of what is happening.','language'),
      q('“Kiasu” describes fear of…', ['Losing out','Rain','Spicy food','Public transport'],0,'Kiasu comes from Hokkien and refers to a fear of losing out. Queue strategy may intensify.','language'),
      q('“Paiseh” is closest to…', ['Embarrassed or sorry','Hungry','Very brave','Please hurry'],0,'Paiseh conveys embarrassment, awkwardness or apology, depending on context.','language'),
      q('“Alamak!” is an exclamation closest to…', ['Oh no!','Good morning','Well done','Be quiet'],0,'Alamak expresses surprise, dismay or exasperation. Useful when the timer reaches zero.','language'),
      q('If food is “atas”, it is…', ['Fancy or high-class','Spoiled','Free of charge','Very sour'],0,'Atas literally means “upstairs” in Malay and colloquially suggests posh or high-class.','language'),
      q('What does “makan” mean?', ['Eat / food','Sleep','Work','Run'],0,'Makan is Malay for eat or food and is widely used in Singaporean speech.','singlish'),
      q('“Jialat” signals that a situation is…', ['Bad or troublesome','Perfectly organised','Very quiet','Almost finished'],0,'Jialat expresses that something is serious, awful or in trouble.','language'),
      q('If a place is “ulu”, it is…', ['Remote or out of the way','Luxurious','Underground','Next to the CBD'],0,'Ulu describes somewhere remote or inconveniently far. Melbourne translation: “How many replacement buses?”','language'),
      q('“Bo jio!” complains that someone…', ['Did not invite you','Spoke too softly','Ordered no chilli','Paid too early'],0,'Bo jio means “never invite”. Deploy immediately upon seeing colleagues’ food photos.','language'),
      q('What is a “sabo”?', ['To sabotage or put someone in a difficult spot','A dessert','A bus card','A polite greeting'],0,'Sabo is short for sabotage and can describe pranking or landing someone in trouble.','language'),
      q('“Arrow” someone means to…', ['Assign them a task, often unwillingly','Give directions','Praise their haircut','Buy them lunch'],0,'To arrow someone is to nominate or assign them a job—sometimes with impressive speed.','language'),
      q('“Own time, own target” means…', ['Proceed at your own pace','Everyone must finish now','Cancel the task','Work only at night'],0,'The phrase means to act independently or at one’s own pace, with military roots in local usage.','singlish'),
      q('“Talk cock” means to…', ['Talk nonsense or banter','Discuss poultry science','Give a lecture','Whisper formally'],0,'It means to talk nonsense or chat idly. No birds need be involved.','language'),
      q('“Sian” expresses…', ['Boredom, weariness or frustration','Great excitement','Extreme hunger','Formal agreement'],0,'Sian communicates boredom, tired resignation or frustration.','language'),
      q('If someone says “wait long long”, should you expect it soon?', ['Yes, immediately','No, probably not','Only after lunch','Exactly twenty minutes'],1,'The phrase sarcastically suggests the hoped-for event is unlikely to happen.','language'),
      q('Singlish is best described as…', ['Informal colloquial Singapore English','A separate national language','English spoken only by tourists','A spelling reform'],0,'Singlish is an informal colloquial variety shaped by Singapore’s multilingual environment.','singlish')
    ]
  },
  {
    title: 'Singapore, lah',
    description: 'Tiny island, enormous personality. Geography, symbols and unusually specific local knowledge.',
    questions: [
      q('How many official languages does Singapore have?', ['Two','Three','Four','Five'],2,'Singapore has four official languages: Malay, Mandarin, Tamil and English.','gov'),
      q('What is Singapore’s national language?', ['English','Malay','Mandarin','Tamil'],1,'Malay is the national language; the anthem is also in Malay.','gov'),
      q('What is Singapore’s national flower?', ['Vanda Miss Joaquim','Lotus','Rafflesia','Red rose'],0,'Vanda Miss Joaquim, an orchid hybrid, was chosen as the national flower in 1981.','symbols'),
      q('Which creature is half lion, half fish?', ['Merlion','Garuda','Naga','Hornbill'],0,'The Merlion combines a lion head with a fish body, linking the Lion City and its maritime beginnings.','symbols'),
      q('What does “Singapura” traditionally mean?', ['Lion City','Garden Island','Southern Port','City of Rain'],0,'The name derives from Sanskrit words associated with lion and city.','symbols'),
      q('Which colour is NOT on Singapore’s national flag?', ['Red','White','Blue','None—blue is not there'],2,'The flag is red and white, with a white crescent and five stars. Blue has no shift today.','symbols'),
      q('How many stars appear on Singapore’s flag?', ['Three','Four','Five','Six'],2,'Five stars represent democracy, peace, progress, justice and equality.','symbols'),
      q('What does the crescent moon on the flag represent?', ['A young nation on the rise','The monsoon season','Five islands','Night-time commerce'],0,'The waxing crescent represents a young nation on the ascendant.','symbols'),
      q('What is the name of Singapore’s airport?', ['Changi','Seletar International only','Merlion Gateway','Orchard Air Hub'],0,'Changi Airport is the main international airport. The indoor waterfall is not the boarding gate.','gov'),
      q('Which line crosses Singapore just north of the island?', ['Equator','Tropic of Cancer','Prime Meridian','International Date Line'],0,'Singapore lies about one degree north of the Equator.','gov'),
      q('What is an HDB flat?', ['Public housing apartment','Hotel breakfast deal','Heritage dining booth','High-speed bus'],0,'HDB refers to the Housing & Development Board, central to Singapore’s public housing system.','gov'),
      q('What is an “void deck”?', ['Open ground-floor space under many HDB blocks','An empty ship','A closed rooftop','A train platform'],0,'Void decks are open communal spaces at the ground level of many public housing blocks.','gov'),
      q('The MRT is Singapore’s…', ['Mass rapid transit rail system','Main restaurant tax','Maritime rescue team','Museum pass'],0,'MRT stands for Mass Rapid Transit, the urban rail network.','gov'),
      q('What animal is the Night Safari especially associated with?', ['No single animal—it is a nocturnal wildlife park','Only lions','Only birds','Only marine life'],0,'Night Safari is a wildlife park designed around nocturnal animals rather than one mascot species.','gov'),
      q('Which shopping road is famous in central Singapore?', ['Orchard Road','Apple Avenue','Durian Drive','Kaya Crescent'],0,'Orchard Road is Singapore’s best-known shopping belt. It was once associated with plantations.','gov'),
      q('What is Pulau Ubin?', ['An island northeast of mainland Singapore','A skyscraper','A noodle dish','A university'],0,'Pulau Ubin is an island known for kampong landscapes, cycling and nature.','gov'),
      q('Which reservoir park has a famous treetop walk?', ['MacRitchie','Marina Barrage','Fort Canning','East Coast Park'],0,'MacRitchie Reservoir Park connects to forest trails and the TreeTop Walk.','gov'),
      q('What is the Esplanade nicknamed after?', ['Durian','Coconut','Pineapple','Rambutan'],0,'Its spiky twin domes earned it the nickname “the Durian”. Architecture: pungent only metaphorically.','gov'),
      q('Which side of the road do vehicles drive on?', ['Left','Right','Whichever has less ERP','The middle'],0,'Singapore drives on the left, a legacy of British administration.','gov'),
      q('What currency is used in Singapore?', ['Singapore dollar','Ringgit','Baht','Lion pound'],0,'The Singapore dollar is commonly abbreviated SGD or written S$.','gov')
    ]
  },
  {
    title: 'Then & now',
    description: 'History without the long lecture. Empires, independence and a very busy timeline.',
    questions: [
      q('In which year did Singapore become independent?', ['1959','1963','1965','1971'],2,'Singapore became an independent sovereign state on 9 August 1965.','history'),
      q('Before independence, Singapore joined which federation in 1963?', ['Malaysia','Indonesia','Brunei','Australia'],0,'Singapore became part of Malaysia in September 1963 and separated in August 1965.','history'),
      q('Who is widely associated with establishing a British trading post in 1819?', ['Stamford Raffles','James Cook','William Farquhar alone','Francis Light'],0,'Stamford Raffles negotiated the 1819 agreement; William Farquhar became the first Resident.','history'),
      q('Who was Singapore’s first prime minister?', ['Lee Kuan Yew','Yusof Ishak','Goh Keng Swee','S. Rajaratnam'],0,'Lee Kuan Yew became prime minister in 1959 and served until 1990.','history'),
      q('Who was Singapore’s first president?', ['Yusof Ishak','Benjamin Sheares','S. Rajaratnam','David Marshall'],0,'Yusof Ishak became the first president of independent Singapore in 1965.','history'),
      q('What happened to Singapore in February 1942?', ['It fell to Japanese forces','It declared independence','The MRT opened','The flag was unveiled'],0,'British forces surrendered Singapore to Japan in February 1942 during the Second World War.','history'),
      q('What name was Singapore given during the Japanese Occupation?', ['Syonan-to','Temasek Baru','Lion Port','Nippon Selatan'],0,'The occupying authorities renamed Singapore Syonan-to, commonly translated as “Light of the South”.','history'),
      q('When did the Japanese Occupation end?', ['1943','1945','1948','1950'],1,'It ended in 1945 following Japan’s surrender.','history'),
      q('What older name is strongly associated with Singapore before “Singapura”?', ['Temasek','Malacca','Batavia','Ayutthaya'],0,'Temasek appears in historical sources and is commonly linked to the island’s earlier past.','history'),
      q('In which year did Singapore gain full internal self-government?', ['1945','1955','1959','1967'],2,'Singapore achieved full internal self-government in 1959.','history'),
      q('Singapore’s flag, crest and anthem were first unveiled in…', ['1948','1959','1965','1981'],1,'The three symbols were unveiled on 3 December 1959 during Yusof Ishak’s installation.','gov'),
      q('Who composed “Majulah Singapura”?', ['Zubir Said','Dick Lee','S. Rajaratnam','Iskandar Mirza Ismail'],0,'Zubir Said composed the national anthem.','history'),
      q('Who drafted Singapore’s National Pledge?', ['S. Rajaratnam','Lee Kuan Yew','Yusof Ishak','Ong Teng Cheong'],0,'Then Minister for Foreign Affairs S. Rajaratnam drafted the pledge in 1966.','history'),
      q('What was a major purpose of early hawker centres?', ['Resettle street hawkers with sanitation and services','Create fine-dining districts','Serve only civil servants','Replace wet markets completely'],0,'The centres helped move street hawkers into managed premises with water, waste and sanitation facilities.','roots'),
      q('Street hawkers were documented in Singapore as early as the…', ['Late 19th century','1920s only','1970s only','1990s'],0,'Historical records, images and writing show street hawkers from at least the late nineteenth century.','roots'),
      q('When was Vanda Miss Joaquim chosen as national flower?', ['1959','1965','1981','2000'],2,'The orchid was selected in 1981 from a field of proposed flowers.','symbols'),
      q('When was the Lion Head symbol introduced?', ['1965','1975','1986','2005'],2,'The Lion Head symbol was introduced in 1986 for informal use as a national symbol.','symbols'),
      q('The Speak Good English Movement launched in…', ['1981','1990','2000','2015'],2,'It launched on 29 April 2000. Singlish, naturally, did not submit a resignation letter.','singlish'),
      q('Which area began as a British colonial civic and commercial centre?', ['Singapore River area','Pulau Ubin quarry only','Jurong Bird Park','Changi Airport'],0,'Trade and colonial administration clustered around the Singapore River and nearby civic district.','history'),
      q('National Day is celebrated on…', ['9 August','1 January','31 August','3 December'],0,'9 August marks Singapore’s independence in 1965.','gov')
    ]
  },
  {
    title: 'Name that dish',
    description: 'We give the clue. You name the food. Stomachs may begin submitting formal complaints.',
    questions: [
      q('Rice cooked in coconut milk, usually with sambal, egg and ikan bilis.', ['Nasi lemak','Chicken rice','Claypot rice','Congee'],0,'Nasi lemak is the coconut-rice classic with a flexible cast of sides.','food'),
      q('Flat rice noodles stir-fried dark with egg, bean sprouts and savoury sauce.', ['Char kway teow','Mee rebus','Laksa','Thosai'],0,'Char kway teow is a wok-fried flat-rice-noodle dish prized for smoky wok hei.','food'),
      q('Rice noodles in a spicy coconut-based broth.', ['Laksa','Bak kut teh','Fishball soup','Mee goreng'],0,'Laksa has regional forms; Singapore’s Katong-style version is rich, spicy and coconut-based.','food'),
      q('Poached chicken, fragrant rice, chilli and ginger sauces.', ['Hainanese chicken rice','Nasi briyani','Ayam penyet','Duck rice'],0,'The deceptively simple national favourite is Hainanese chicken rice.','food'),
      q('Crisp toast with coconut-egg jam and butter.', ['Kaya toast','Roti john','Popiah','Apam balik'],0,'Kaya toast: breakfast, snack and excellent meeting agenda item.','food'),
      q('Pork ribs in a peppery or herbal broth.', ['Bak kut teh','Sup tulang','Lor mee','Mee siam'],0,'Bak kut teh has different styles; Singapore is especially known for a peppery Teochew version.','food'),
      q('Minced fish paste grilled in banana or coconut leaf.', ['Otak-otak','Ngoh hiang','Fish head curry','Har cheong gai'],0,'Otak-otak is aromatic spiced fish paste cooked in leaf wrapping.','food'),
      q('Fried radish cake with egg; ordered black or white.', ['Chai tow kway','Kueh lapis','Yam cake','Muah chee'],0,'Chai tow kway is Singaporean “carrot cake”; black versions add sweet dark soy sauce.','food'),
      q('Indian-Muslim griddled bread filled with egg, onion and minced meat.', ['Murtabak','Thosai','Chapati','Putu piring'],0,'Murtabak is a stuffed, pan-fried bread often served with curry.','food'),
      q('Skewered grilled meat with peanut sauce.', ['Satay','Rendang','Bak kwa','Char siu'],0,'Satay traces strong roots to Javanese culinary practice and is now a hawker staple.','cuisine'),
      q('Crab coated in a sweet, savoury and spicy tomato-chilli sauce.', ['Chilli crab','Black pepper crab','Butter crab','Cold crab salad'],0,'Chilli crab is messy, theatrical and correctly approached with mantou.','food'),
      q('Fresh thin wrapper around braised turnip, vegetables and condiments.', ['Popiah','Curry puff','Spring onion pancake','Chee cheong fun'],0,'Popiah is a fresh roll with a soft wrapper and layered fillings.','food'),
      q('Yellow noodles in a sweet-spicy, thick gravy, often with egg.', ['Mee rebus','Mee pok','Wanton mee','Prawn mee'],0,'Mee rebus means boiled noodles, served with a rich potato-thickened gravy.','food'),
      q('Shaved ice with syrups, jellies, beans and sometimes a glorious chaos of toppings.', ['Ice kacang','Chendol only','Tau huay','Cheng tng'],0,'Ice kacang is a colourful shaved-ice dessert; topping diplomacy varies by stall.','food'),
      q('Green jelly strands, coconut milk and palm sugar over ice.', ['Chendol','Bandung','Bubur cha cha','Grass jelly'],0,'Chendol combines pandan jelly, coconut milk and gula melaka.','food'),
      q('Fish head simmered in a tangy, spicy curry.', ['Fish head curry','Curry mee','Assam fish only','Otak-otak'],0,'Fish head curry is a Singapore creation shaped by South Indian and Chinese dining cultures.','food'),
      q('Fried noodles in prawn-and-pork stock, served with lime and sambal.', ['Hokkien mee','Mee siam','Char kway teow','Beef hor fun'],0,'Singapore Hokkien mee is moist fried noodles enriched with seafood stock.','food'),
      q('Rice flour cakes topped with preserved radish.', ['Chwee kueh','Putu mayam','Kueh tutu','Ang ku kueh'],0,'Chwee kueh pairs steamed rice cakes with savoury preserved radish.','food'),
      q('Bone marrow dish in vivid red soup, eaten with bread and determination.', ['Sup tulang merah','Bak kut teh','Mutton soup','Soto ayam'],0,'Sup tulang merah is known for mutton bones, red gravy and hands-on eating.','cuisine'),
      q('Rice vermicelli with a sweet-sour-spicy gravy and tau pok.', ['Mee siam','Mee goreng','Lor mee','Yong tau foo'],0,'Mee siam is thin rice noodles served dry-style or with a tangy gravy, depending on the version.','food')
    ]
  },
  {
    title: 'True or blur?',
    description: 'One statement is true. Three are blur. Confidence is not evidence, hor.',
    questions: [
      q('Which statement about hawker culture is true?', ['It is only about cheap food','It includes community dining practices','It began after 2000','Every stall is government-owned'],1,'UNESCO recognises the shared practices, knowledge, spaces and community life—not simply a price point.','unesco'),
      q('Which statement about Singlish is true?', ['It has no grammar','It is informal colloquial Singapore English','It is the national language','It is spoken only in hawker centres'],1,'Singlish is a systematic colloquial variety shaped by multilingual contact.','singlish'),
      q('Which statement about kopi O kosong is true?', ['It has milk but no coffee','It has no milk and no sugar','It is always iced','It contains tea'],1,'O removes milk; kosong removes sugar. Two words, complete beverage specification.','food'),
      q('Which statement about Singapore carrot cake is true?', ['It is a sweet layer cake','It uses radish cake','It contains mandatory orange carrot','It is served with icing'],1,'It is a savoury fried radish-cake dish. Birthday candles would be an adventurous choice.','food'),
      q('Which statement about the Merlion is true?', ['It is Singapore’s national animal','It has a lion head and fish body','It predates Temasek','It appears on the national flag'],1,'The Merlion is a tourism icon, not the national animal and not on the flag.','symbols'),
      q('Which statement about the flag is true?', ['It has six stars','The crescent represents a young nation','Blue represents the sea','It was created in 1981'],1,'The crescent symbolises a young nation on the ascendant.','symbols'),
      q('Which statement about satay is true?', ['It is boiled meat','It is grilled on skewers','It is always pork','It has no sauce'],1,'Satay is grilled skewered meat, commonly served with a peanut-based sauce.','cuisine'),
      q('Which statement about “chope” is true?', ['It means reserve','It means cancel','It means spicy','It is a train line'],0,'To chope is to reserve a seat or place, often using a small personal item.','singlish'),
      q('Which statement about Vanda Miss Joaquim is true?', ['It is an orchid','It is a bird','It is a ship','It is a neighbourhood'],0,'Vanda Miss Joaquim is Singapore’s national flower and an orchid hybrid.','symbols'),
      q('Which statement about the national anthem is true?', ['It is in English','It is in Malay','It has no lyrics','It was written in 2000'],1,'Majulah Singapura is sung in Malay.','gov'),
      q('Which statement about “kiasu” is true?', ['It means afraid to lose out','It means generous host','It means very sleepy','It means no chilli'],0,'Kiasu captures fear of losing out—sometimes expressed through heroic queue commitment.','language'),
      q('Which statement about hawker centres in the 1970s is true?', ['They helped resettle street hawkers','They replaced all restaurants','They sold only Chinese food','They were built only at airports'],0,'Resettlement into centres improved access to infrastructure and regulated food preparation.','roots'),
      q('Which statement about HDB housing is true?', ['HDB is a private hotel chain','It is central to public housing','It exists only on Sentosa','It began as a food authority'],1,'The Housing & Development Board develops public housing estates across Singapore.','gov'),
      q('Which statement about 9 August is true?', ['It is National Day','It is the monsoon new year','It marks the 1959 flag unveiling','It is Hawker Day'],0,'National Day on 9 August commemorates independence in 1965.','gov'),
      q('Which statement about chilli crab is true?', ['It is eaten cold','Its sauce is tomato-chilli based','It contains no crab','It is a dessert'],1,'The sauce is sweet, savoury and spicy, usually thickened and clinging to the crab.','food'),
      q('Which statement about “atas” is true?', ['It can mean posh or high-class','It means downstairs','It means takeaway','It means exhausted'],0,'Atas colloquially describes something fancy, posh or upmarket.','language'),
      q('Which statement about Singapore is true?', ['It lies south of the Equator','It lies just north of the Equator','It is in the Southern Hemisphere','It uses three time zones'],1,'Singapore is roughly one degree north of the Equator.','gov'),
      q('Which statement about kaya is true?', ['It is a savoury fish paste','It is a coconut-and-egg spread','It is a noodle','It is fermented chilli'],1,'Kaya is sweet coconut-and-egg jam, usually fragranced with pandan.','food'),
      q('Which statement about “bo jio” is true?', ['It complains about not being invited','It asks for the bill','It means well done','It orders coffee'],0,'Bo jio is the playful accusation: “you did not invite me.”','language'),
      q('Which statement about rojak is true?', ['Its name can also suggest a mixture','It contains only fruit','It is always a soup','It is a coffee drink'],0,'Rojak is a mixed salad, and the word is also used metaphorically for an eclectic mixture.','cuisine')
    ]
  },
  {
    title: 'Final shiokdown',
    description: 'Harder, faster, mixed. This is where the tissue packet hits the table.',
    questions: [
      q('Which ordering sequence gives black coffee with no sugar?', ['Kopi C','Kopi O kosong','Kopi peng','Kopi gah dai'],1,'Kopi O kosong: no milk, no sugar. The order is longer than the drink lasts.','food'),
      q('Which five ideals are represented by the flag’s stars?', ['Courage, wealth, health, unity, luck','Democracy, peace, progress, justice, equality','Food, shelter, work, study, play','Sea, sky, land, city, garden'],1,'The five stars embody democracy, peace, progress, justice and equality.','symbols'),
      q('Which dish name literally means “meat bone tea”?', ['Bak kut teh','Char kway teow','Mee rebus','Nasi lemak'],0,'Bak kut teh literally translates as meat bone tea. Tea may accompany it, but the bowl is soup.','food'),
      q('Which Singlish word is derived from a Malay word meaning “upstairs”?', ['Atas','Blur','Chope','Sian'],0,'Atas means upstairs in Malay and colloquially signals something high-class.','language'),
      q('Which came first?', ['Independence in 1965','Full internal self-government in 1959','Joining Malaysia in 1963','All happened together'],1,'Self-government came in 1959, merger in 1963, then independence in 1965.','history'),
      q('Which dish is most directly associated with preserved radish topping steamed rice cakes?', ['Chwee kueh','Kaya toast','Otak-otak','Murtabak'],0,'Chwee kueh is topped with chai poh, a savoury preserved-radish mixture.','food'),
      q('“Majulah Singapura” means…', ['Forward Singapore','Beautiful Singapore','Singapore Forever','Lion City Eats'],0,'The national anthem’s title means “Onward Singapore” or “Forward Singapore”.','gov'),
      q('Which is the best distinction between black and white carrot cake?', ['Black uses sweet dark soy; white generally does not','Black uses chocolate','White contains cream','Only black has egg'],0,'The black style gets a sweet-dark-soy treatment; the white style highlights egg and savoury seasoning.','food'),
      q('What do the five partings of the Lion Head’s mane represent?', ['Five founding restaurants','The same five national ideals as the flag stars','Five MRT lines','Five former colonies'],1,'They represent democracy, peace, progress, justice and equality.','symbols'),
      q('Which pairing correctly matches term and meaning?', ['Ulu — remote','Shiok — confused','Blur — delicious','Paiseh — expensive'],0,'Ulu means remote or out of the way. The others are all kena mixed up.','language'),
      q('Which dish is a Singapore creation often linked to Indian restaurateur J. M. Gomez?', ['Fish head curry','Satay','Thosai','Nasi lemak'],0,'Fish head curry is widely traced to a Singapore Indian restaurant context and cross-cultural diners.','food'),
      q('What is the strongest reason hawker culture is “intangible” heritage?', ['The buildings are invisible','The living knowledge and practices matter','The food has no weight','It exists only online'],1,'Intangible heritage concerns living practices, knowledge, skills and social meaning transmitted by communities.','unesco'),
      q('Which sentence most naturally uses “lah”?', ['Relax lah, still got time.','Lah is my surname only.','I bought three lah kilograms.','The lah leaves are green.'],0,'Lah works as a discourse particle adding interpersonal tone and emphasis.','singlish'),
      q('What is the correct timeline order?', ['Japanese Occupation → self-government → merger → independence','Merger → Occupation → independence → self-government','Independence → merger → Occupation → self-government','Self-government → Occupation → merger → independence'],0,'Occupation began in 1942; self-government came in 1959; merger in 1963; independence in 1965.','history'),
      q('Which dessert best matches palm sugar + coconut milk + green jelly?', ['Chendol','Ice kacang only','Tau huay','Cheng tng'],0,'That trio is the classic structure of chendol.','food'),
      q('What social function do hawker centres serve beyond feeding people?', ['Shared everyday community spaces','Passport control','Only tourist entertainment','Private members’ dining'],0,'They are accessible shared spaces where people from varied backgrounds dine and interact.','unesco'),
      q('Which is a genuinely multilingual Singapore word history?', ['Kopitiam combines Malay “kopi” and Hokkien “tiam”','MRT is ancient Sanskrit','Kaya means train in English','Merlion is a Tamil verb'],0,'Kopitiam neatly reflects Singapore’s language contact: coffee + shop from different linguistic sources.','singlish'),
      q('If the host says “Own time, own target,” what should teams do?', ['Proceed independently at their own pace','Stop immediately','Swap answers','Order coffee'],0,'It signals independent action at one’s own pace—but the visible timer may have other plans.','singlish'),
      q('Which food best demonstrates “hybridisation” in Singapore cuisine?', ['A locally created cross-cultural dish such as fish head curry','Unseasoned imported fruit','Plain bottled water','A dish unchanged anywhere'],0,'Singapore cuisine evolves through localisation and hybridisation across communities and available ingredients.','cuisine'),
      q('Final question: what is the only acceptable response to “Can or cannot?”', ['Can lah!','Please form a subcommittee','Circle back next quarter','The tissue packet abstains'],0,'Correct. Can lah. Now makan.','singlish')
    ]
  }
];

if (rounds.some(round => round.questions.length !== 20)) {
  throw new Error('Every round must contain exactly 20 questions.');
}
