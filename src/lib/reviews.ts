// Google reviews shown in the homepage carousel. Quotes are kept verbatim in
// the language the customer wrote them (not translated).
export type Review = {
  name: string;
  initials: string;
  short: string;
  full?: string;
};

export const reviews: Review[] = [
  {
    name: "Anastazia Telemachou",
    initials: "AT",
    short:
      "\"My go-to place for a wide variety of quality eyewear, offered by professionals who truly know the...\"",
    full: "\"My go-to place for a wide variety of quality eyewear, offered by professionals who truly know their craft and how to help others! Thank you 🙂\"",
  },
  {
    name: "Andrea Savvidou",
    initials: "AS",
    short:
      "\"Phos Optics in Limassol deserves 5 stars! Nikolas was amazing—super friendly and professional. He...\"",
    full: "\"Phos Optics in Limassol deserves 5 stars! Nikolas was amazing—super friendly and professional. He really took the time to listen and help me with my eye issue, and I felt like I was in great hands. The whole experience was smooth. If you're looking for excellent service and someone who genuinely cares, I highly recommend Nikolas and Phos Optics!\"",
  },
  {
    name: "Irene Symeonidou",
    initials: "IS",
    short:
      "\"The measurements are made with great precision and detail. They are willing and patient in findin...\"",
    full: "\"The measurements are made with great precision and detail. They are willing and patient in finding a frame. There is courtesy, service and a friendly atmosphere with customers. They have a wide variety of frames with a wide price range. Easy parking.\"",
  },
  {
    name: "Paul Dyke",
    initials: "PD",
    short:
      "\"Excellent, friendly service from the owner Nicos. Very professional and competitive pricing. Thor...\"",
    full: "\"Excellent, friendly service from the owner Nicos. Very professional and competitive pricing. Thoroughly recommend!\"",
  },
  {
    name: "Aliya Migranova",
    initials: "АМ",
    short:
      "\"Excellent optics. They selected a frame taking into account all my requests. I recommend!\"",
  },
  {
    name: "Maksym Nekhai",
    initials: "MN",
    short:
      "\"The excelent service and good pricing. Nikolas is very helpful and professional.\"",
  },
];
