import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("kakaoMap");

      const position = new window.kakao.maps.LatLng(37.5103698, 126.945507);

      const options = {
        center: position,
        level: 4,
      };

      const map = new window.kakao.maps.Map(container, options);

      const marker = new window.kakao.maps.Marker({
        position,
      });

      marker.setMap(map);

      // 장소 이름 라벨
      const overlay = new window.kakao.maps.CustomOverlay({
        position,
        content: `
          <div class="px-3 py-1.5  bg-white rounded-lg shadow text-sm font-semibold">
            Moxen
          </div>
        `,
        yAnchor: 2.0,
      });

      overlay.setMap(map);

      // 확대/축소 컨트롤 추가
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    });
  }, []);

  return (
    <div id="kakaoMap" className="h-[40vh] w-full border md:h-[50vh]"></div>
  );
}
