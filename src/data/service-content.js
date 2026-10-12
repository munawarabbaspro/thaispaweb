// Page copy for each treatment. Prices and durations come from services.js — never repeated here.
// Register: massage eases muscle tension, stiffness and stress. No clinical claims.

export const commonSkip = [
  'You are pregnant',
  'You have had a fracture or surgery recently',
  'You have a fever or an infection',
  'Your blood pressure is not under control',
  'A doctor is already treating the problem you want massaged',
]
export const skipClosing = 'If a doctor is treating you for this, ask them first. If you are unsure, tell us when you book and we will tell you honestly whether to wait.'

export const content = {
  'thai-massage': {
    intro: [
      'Thai massage is done on a mat rather than an oiled table, and it works through the whole body in a flowing sequence of firm pressure, gentle stretches and slow rocking. The therapist uses thumbs, palms, forearms and sometimes feet to press along the muscle lines, then moves your legs and arms into easy stretches. It feels closer to guided stretching than to a rub-down.',
      'People book it when they feel stiff and tight rather than sore: hips that have locked from sitting, hamstrings that will not let you bend, a body that feels heavy and low on energy. You stay fully clothed, so there is no oil and no need to undress.',
    ],
    note: 'You stay fully clothed in loose cotton wear provided by the spa. Please do not wear jeans or anything stiff.',
    best: ['Stiff, tight hips', 'Short, tight hamstrings', 'A heavy, low-energy body', 'Sitting all day', 'Feeling stuck rather than sore', 'People who dislike oil'],
    steps: [
      'We start with two minutes of questions: where you feel tight, anything to avoid, how firm you like it.',
      'You change into the cotton wear we provide and lie on a padded mat in a private room.',
      'The therapist presses along the legs, back and arms in a steady rhythm, then guides each limb through gentle stretches. You never have to push; say so if a stretch is too much.',
      'The session finishes with slower pressure on the shoulders and neck, and a minute to sit up before you stand.',
    ],
    skip: ['You have very loose or painful joints, or cannot be stretched comfortably'],
    aftercare: 'Drink a glass of water and take a short, easy walk in the evening so the looser feeling carries into tomorrow.',
    related: ['deep-tissue-massage', 'full-body-massage', 'sports-massage'],
  },
  'deep-tissue-massage': {
    intro: [
      'Deep tissue massage uses slow, firm strokes and sustained pressure to reach the deeper layers of muscle. Instead of gliding quickly over the surface, the therapist works on one tight area at a time, using forearms, knuckles and thumbs until the knot starts to soften.',
      'It suits people whose tension keeps coming back in the same places: the ridge across the shoulders after a long week at a screen, a stubborn spot beside the shoulder blade, thighs and calves that feel tight after training. It is firmer than a relaxing massage, but it should always be pressure you can breathe through.',
    ],
    note: 'Mild soreness for a day afterwards is normal, like the day after a workout. It should fade within 24 to 48 hours.',
    best: ['Chronic knots', 'Desk-job shoulders', 'Tight upper back', 'Gym soreness', 'Tension that keeps returning', 'A firm pressure preference'],
    steps: [
      'We ask where the tension sits and how firm you want it, and we agree a pressure scale before starting.',
      'You lie on the table under a towel; only the area being worked is uncovered, and oil keeps the strokes smooth.',
      'The therapist warms the muscle first, then moves into slow, deeper pressure on the tight spots. Tell us at any moment to ease off or go deeper.',
      'We finish with lighter strokes to settle the area, then show you a simple stretch for home.',
    ],
    skip: ['You bruise very easily or take blood-thinning medicine', 'You have a skin condition over the area to be worked'],
    aftercare: 'Drink water, keep the worked area warm that evening, and avoid a hard workout the same night.',
    related: ['back-neck-massage', 'sports-massage', 'swedish-massage'],
  },
  'swedish-massage': {
    intro: [
      'Swedish massage is the classic relaxing massage: long, flowing strokes with warm oil, gentle kneading and light circular movements, all at a comfortable pressure. The aim is simple: let tight muscles loosen and let your mind slow down.',
      'It is the easiest place to start if you have never had a massage, and it is just as good if you simply want an hour where nothing is asked of you. The pressure is light to medium, and you can ask for it to be firmer on the shoulders or softer anywhere at all.',
    ],
    best: ['Your first massage', 'General tension', 'Winding down after a busy week', 'A light to medium pressure', 'Feeling wound up', 'Switching off for an hour'],
    steps: [
      'Two minutes of questions first: any sore spots, anything to avoid, and how firm you like it.',
      'You lie on the table under a towel in a private room, and only the part being worked is uncovered.',
      'The therapist moves through the back, legs, arms and shoulders with long strokes and gentle kneading, spending longer wherever you feel tight.',
      'The last few minutes slow right down, then you get time to sit up and drink some water.',
    ],
    skip: ['You have a skin condition or open wound over the area to be worked'],
    aftercare: 'Keep the evening quiet if you can, and drink a glass of water to help you feel clear-headed tomorrow.',
    related: ['full-body-massage', 'aromatherapy-massage', 'thai-massage'],
  },
  'aromatherapy-massage': {
    intro: [
      'Aromatherapy massage pairs a gentle, flowing Swedish-style massage with essential oils chosen for how they smell and feel. Lavender is calming, citrus is lifting, and the warm oil keeps every stroke soft. The scent is part of the session: you breathe it in while the therapist works through the back, shoulders, arms and legs.',
      'People book it when stress shows up in the body: a tight band across the forehead, shoulders pulled up toward the ears, and nights where sleep will not come. It is a slow, quiet massage meant to bring you down a level.',
    ],
    note: 'Tell us before we start if you are sensitive to strong scents or have ever reacted to an oil. We will choose a milder blend.',
    best: ['Stress held in the shoulders', 'Tension headaches', 'Poor sleep', 'A slow, quiet session', 'Wanting a calming scent', 'Switching off at the end of the day'],
    steps: [
      'We start with a few questions and let you choose a scent you like from the oils we offer.',
      'You lie on the table under a towel in a dimmed private room.',
      'The therapist works through the neck, shoulders, back and legs with slow, steady strokes, keeping the pressure soft to medium.',
      'The final minutes are very still, so you leave calm rather than rushed.',
    ],
    skip: ['You are sensitive to strong scents or essential oils', 'You have asthma that is triggered by fragrance'],
    aftercare: 'Go home and wind down: dim the lights, put the phone away early, and drink water before bed.',
    related: ['swedish-massage', 'head-shoulder-massage', 'full-body-massage'],
  },
  'hot-stone-massage': {
    intro: [
      'In a hot stone massage the therapist places smooth, warm basalt stones along the back and uses them, together with their hands, to glide over the muscles. The steady heat softens stiff muscles so the pressure can go deeper without feeling harsh.',
      'It is a favourite in the colder months, and for anyone whose muscles are slow to let go: shoulders that stay tight however much you stretch, a back that feels like a board in the morning. The warmth is gentle and the pace is slow, so it also works well when you want comfort more than firmness.',
    ],
    note: 'The stones are warm, never hot. Tell the therapist straight away if any stone feels too warm; we adjust the heat or take it away.',
    best: ['Cold-weather stiffness', 'Muscles slow to release', 'A stiff back in the morning', 'Tight shoulders', 'Wanting warmth and comfort', 'Slow, steady pressure'],
    steps: [
      'We ask about sore spots and how you feel about heat, and we check the stones against your comfort first.',
      'You lie under a towel in a private room while the stones are warmed.',
      'The therapist lays warm stones along the back, then uses them with oil to glide over the muscles, adding hand pressure as the area softens.',
      'The session ends with the stones removed and a few slower strokes to settle everything.',
    ],
    skip: ['You have reduced feeling in your skin, for example from diabetes', 'You are sensitive to heat or have a skin condition on the area', 'You have a medical device fitted under the skin'],
    aftercare: 'Stay warm for the rest of the evening and drink a glass of water; the loose feeling lasts longer if you stay warm.',
    related: ['deep-tissue-massage', 'swedish-massage', 'back-neck-massage'],
  },
  'sports-massage': {
    intro: [
      'Sports massage is aimed at the muscles you actually use: quads, hamstrings, calves, glutes, shoulders. The therapist mixes firm compressions, stretching and focused work on tight areas to ease the stiffness that builds up with training.',
      'Use it after a heavy week of gym sessions, a long run or a match, or a few days before an event when you want the legs to feel loose rather than tight. It is firmer than a relaxing massage and more direct, so tell us what you train for and where you feel tight.',
    ],
    best: ['Training recovery', 'Tight hamstrings', 'Heavy, sore legs', 'Pre-event preparation', 'Gym, running or cricket', 'Shoulders tight from lifting'],
    steps: [
      'We ask what you train, when your next session or event is, and where you feel tight.',
      'You lie on the table under a towel; the worked area is uncovered and oiled.',
      'The therapist uses firm compressions and stretching on the main muscle groups you named, and spends longer on the tightest areas.',
      'We finish with lighter strokes and show you one stretch to repeat at home.',
    ],
    skip: ['You have a recent muscle tear or sprain that has not been checked', 'You are within a day of an intense competition and the muscles are already very tender'],
    aftercare: 'Drink water, eat something with protein, and do the stretch we show you once that evening.',
    related: ['deep-tissue-massage', 'thai-massage', 'foot-massage'],
  },
  'full-body-massage': {
    intro: [
      'The Full Body Massage is our standard oil massage, and the one to book if you are not sure which technique you want. It covers the back, shoulders, arms, legs and feet with warm oil, flowing strokes and steady kneading at a medium pressure.',
      'Think of it as the all-round option: relaxing enough to switch off, firm enough to loosen the tight areas. If you want something more specific, such as firmer pressure or a stretch-based session, the other full-body massages are there, and they cost the same, so you are never choosing on price.',
    ],
    best: ['Not sure what to book', 'General aches and tension', 'A balanced, medium pressure', 'A full hour for yourself', 'Tired legs and a stiff back together', 'Anyone who wants the default'],
    steps: [
      'We start with two minutes of questions: where you feel tight and how firm you like it.',
      'You lie on the table under a towel in a private room, and we uncover one area at a time.',
      'The therapist works the back, shoulders, arms, legs and feet with warm oil, adjusting the pressure to what you tell us.',
      'The last minutes are slow, and you get time to sit up before you stand.',
    ],
    skip: ['You have a skin condition or open wound over the area to be worked'],
    aftercare: 'Drink a glass of water and keep the evening light so the relaxed feeling carries on.',
    related: ['swedish-massage', 'deep-tissue-massage', 'thai-massage'],
  },
  'head-shoulder-massage': {
    intro: [
      'Head & Shoulder Massage focuses on the area that carries the most daily tension: scalp, forehead, jaw, neck and shoulders. Neck work is included in every session. It is done seated or lying, mostly through clothes with a light touch of oil, so it fits easily into a day.',
      'It is the one to book if you spend hours at a screen or on your phone, and the tightness has crept from your shoulders up into your neck and head. The session eases that tight, pulled-up feeling around the shoulders and jaw and leaves your head feeling lighter.',
    ],
    best: ['Screen-time headaches from tight shoulders', 'Jaw and neck tension', 'Hunched shoulders', 'Long hours at a laptop', 'A short break in a busy day', 'A thirty-minute first visit'],
    steps: [
      'We ask where you feel it most, from the shoulders, the neck, the jaw or the scalp.',
      'You sit or lie comfortably in a private room.',
      'The therapist works along the shoulders and neck with kneading and pressure, then moves up to the scalp, temples and jaw.',
      'The session ends with slow strokes across the shoulders and a moment to sit back up.',
    ],
    skip: ['You have a recent neck injury', 'You have a skin condition on the scalp or neck'],
    aftercare: 'Roll your shoulders back and drop them a few times each hour, and look away from the screen for a minute now and then.',
    related: ['back-neck-massage', 'aromatherapy-massage', 'deep-tissue-massage'],
  },
  'back-neck-massage': {
    intro: [
      'Back & Neck Massage concentrates on the long muscles either side of the spine, from the lower back up to the base of the skull. The therapist uses warm oil, kneading and steady pressure to ease the stiff, achy feeling that builds up with sitting, driving and carrying.',
      'It is one of the easiest ways to start at Thai Spa: a thirty-minute session is short enough to try without committing to a full hour. Book it for a back that aches after a desk day, a stiff neck when you wake up, or the stiffness that comes after a long drive on the GT Road.',
    ],
    best: ['Lower back ache after sitting', 'A stiff neck', 'Long drives', 'Carrying bags or children', 'A first visit', 'Limited time'],
    steps: [
      'We ask where it aches and for how long, and how firm you want the pressure.',
      'You lie face down under a towel, with only the back and neck uncovered.',
      'The therapist works up and down the muscles beside the spine, then focuses on the neck and the tops of the shoulders.',
      'We finish with slower strokes and a simple posture tip for your day.',
    ],
    skip: ['You have a recent back or neck injury', 'You have severe back pain that has come on suddenly'],
    aftercare: 'Take a short walk, stay warm, and stand up and stretch for a minute every hour at your desk.',
    related: ['head-shoulder-massage', 'deep-tissue-massage', 'foot-massage'],
  },
  'foot-massage': {
    intro: [
      'Foot Massage works on the soles, heels, toes and ankles with firm thumb pressure, then moves up the calves. Feet carry your whole day, and after hours of standing or walking they hold more tension than most people realise.',
      'It suits anyone on their feet all day, such as shopkeepers, teachers, nurses and people who walk a lot, and anyone who just wants a quiet half hour. A good foot massage should leave your legs feeling lighter, and the thirty-minute session makes it an easy first booking.',
    ],
    best: ['Tired legs', 'Swollen-feeling feet', 'All-day standing', 'Lots of walking', 'Tight calves', 'A quiet half hour'],
    steps: [
      'We ask about your day and any sore spots in the feet or calves.',
      'You sit back or lie down in a private room while your feet are washed and dried.',
      'The therapist works the soles, heels and toes with thumb pressure, then moves up the ankles and calves.',
      'The session ends with slow strokes up the legs and a warm towel.',
    ],
    skip: ['You have an open sore, infection or fungal condition on your feet', 'You have a recent ankle or foot injury', 'You have diabetes with reduced feeling in your feet and have not checked with your doctor'],
    aftercare: 'Put your feet up for ten minutes that evening and drink a glass of water.',
    related: ['back-neck-massage', 'sports-massage', 'full-body-massage'],
  },
}

// Opening sentence for each page: carries the page's primary keyword (src/data/keywords.js)
// in plain language, plus a few secondary phrases where they read naturally.
// Left out on purpose: "best ..." claims, "benefits" and symptom phrases (clinical claims),
// and reflexology (not something the menu offers).
export const leads = {
  'thai-massage':
    'Looking for Thai massage in Islamabad? Thai Spa offers traditional Thai massage at Civic Center, Bahria Town Phase 4, and the Thai massage Islamabad price list is published on our [prices page](/prices).',
  'deep-tissue-massage':
    'Our deep tissue massage in Islamabad is at Civic Center, Bahria Town Phase 4. If you have been searching for deep tissue massage near me, prices included, ours are on the [prices page](/prices). Comparing styles? Our guide to [deep tissue vs Swedish massage](/blog/which-massage-should-i-choose) explains the difference.',
  'swedish-massage':
    'Swedish massage in Islamabad is the classic relaxing massage, and Thai Spa in Bahria Town is a gentle place to book your first time massage in Islamabad. Pressure stays light to medium unless you ask for more.',
  'aromatherapy-massage':
    'Aromatherapy massage in Islamabad pairs a slow oil massage with essential oils such as lavender. People book this aroma massage in Bahria Town when they want a quiet hour and a way to unwind from stress.',
  'hot-stone-massage':
    'Hot stone massage in Islamabad uses warm basalt stones to soften stiff muscles. At Thai Spa in Bahria Town the hot stone massage price is on our website, so you know it before you book.',
  'sports-massage':
    'Sports massage in Islamabad is for people who train. Thai Spa offers post workout massage in Bahria Town Phase 4 for heavy legs and tight hamstrings, whether you lift, run or play cricket.',
  'full-body-massage':
    'Full body massage in Islamabad at Thai Spa is our standard oil massage. The full body massage Islamabad price list is on the [prices page](/prices), and the same rates apply to all seven full-body massages in Bahria Town.',
  'head-shoulder-massage':
    'Head and shoulder massage in Bahria Town at Thai Spa covers the scalp, neck and shoulders. A thirty-minute head massage in Islamabad is a short, easy way to start, and neck and shoulder work is included.',
  'back-neck-massage':
    'Back and neck massage in Bahria Town at Thai Spa focuses on the muscles along the spine. A thirty-minute back massage in Islamabad is short enough to try on a first visit, and it also suits a stiff neck after a long drive.',
  'foot-massage':
    'Foot massage in Bahria Town at Thai Spa works on the soles, ankles and calves. A 30 minute foot massage in Islamabad suits tired legs after a long day on your feet.',
}
