import FacilitiesBg from "@/assets/images/facilities_bg.jpg";
import FacilitiesIndividualBg01 from "@/assets/images/room_single_a.jpg";
import FacilitiesIndividualBg02 from "@/assets/images/room_single_b.jpg";
import FacilitiesIndividualBg03 from "@/assets/images/room_deluxe_a.jpg";
import FacilitiesPublicBg01 from "@/assets/images/facilities_public_bg_01.jpeg";
import FacilitiesPublicBg02 from "@/assets/images/facilities_public_bg_02.jpeg";
import CtaSection from "@/components/layout/cta-section";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FacilitiesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-100 w-full overflow-hidden md:h-125">
        <img
          src={FacilitiesBg}
          alt="시설보기"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-normal md:text-5xl">
            시설을 소개합니다
          </h1>
          <p className="max-w-2xl text-sm opacity-90 md:text-lg">
            더 나은 경험을 만들기 위해 우리는 끊임없이 고민하고 발전합니다.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 pt-20 pb-40">
        <h2 className="mb-10 text-2xl font-semibold md:text-3xl">개인 시설</h2>

        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="radius-0 basis-full">
              <Card className="overflow-hidden rounded-none p-0">
                <div
                  className="h-[40vh] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${FacilitiesIndividualBg01})`,
                  }}
                />
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full">
              <Card className="overflow-hidden rounded-none p-0">
                <div
                  className="h-[40vh] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${FacilitiesIndividualBg02})`,
                  }}
                />
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full">
              <Card className="overflow-hidden rounded-none p-0">
                <div
                  className="h-[40vh] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${FacilitiesIndividualBg03})`,
                  }}
                />
              </Card>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="left-4 rounded-none border-none" />
          <CarouselNext className="right-4 rounded-none border-none" />
        </Carousel>
      </section>

      <section className="bg-gray-50 pt-20 pb-40">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-2xl font-semibold md:text-3xl">
            공용 시설
          </h2>

          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem className="radius-0 basis-full">
                <Card className="overflow-hidden rounded-none p-0">
                  <div
                    className="h-[40vh] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${FacilitiesPublicBg01})` }}
                  />
                </Card>
              </CarouselItem>

              <CarouselItem className="basis-full">
                <Card className="overflow-hidden rounded-none p-0">
                  <div
                    className="h-[40vh] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${FacilitiesPublicBg02})` }}
                  />
                </Card>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="left-4 rounded-none border-none" />
            <CarouselNext className="right-4 rounded-none border-none" />
          </Carousel>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
