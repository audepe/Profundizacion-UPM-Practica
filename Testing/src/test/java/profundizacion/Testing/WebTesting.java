package profundizacion.Testing;

import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class WebTesting {
	
	private static WebDriver driver;
	private static String web_url = "http://54.242.132.43";
	
	@BeforeClass
	public static void init() {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
	}
	
	@Before
	public void set_up() {
		driver = new ChromeDriver();
		driver.manage().window().maximize();
		driver.manage().deleteAllCookies();
		driver.manage().timeouts().pageLoadTimeout(40, TimeUnit.SECONDS);
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	}
	
	@Test
	public void testingWebTracker() {
		driver.get(web_url);
		driver.findElement(By.xpath("//input[@id='email']")).sendKeys("profundizacion@gmail.com");
		driver.findElement(By.xpath("//input[@id='url']")).sendKeys("https://moodle.upm.es/");
		driver.findElement(By.xpath("//button[@type='submit']")).click();
	}
	
	@AfterClass
	public static void down() {
		driver.quit();
	}
}
