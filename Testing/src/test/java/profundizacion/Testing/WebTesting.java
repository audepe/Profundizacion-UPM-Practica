package profundizacion.Testing;



import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.concurrent.TimeUnit;



import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class WebTesting {

	private static WebDriver driver;
	private static String baseUrl;
	private boolean acceptNextAlert = true;
	private static StringBuffer verificationErrors = new StringBuffer();

	@BeforeAll
	public static void setUp() throws Exception {
		driver = new ChromeDriver();
		baseUrl = "https://www.google.com/";
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	}

	
	@Test
	public void testEntradaCampoCorreo() throws Exception {
		driver.get("http://54.242.132.43/");
		driver.findElement(By.id("email")).click();
		driver.findElement(By.id("email")).clear();
		driver.findElement(By.id("email")).sendKeys("prueba@alumnos.upm.es");
	}
	
	
	@Test
	public void testEntradaCampoUrl() throws Exception {
		driver.get("http://54.242.132.43/");
		driver.findElement(By.id("url")).click();
		driver.findElement(By.id("url")).clear();
		driver.findElement(By.id("url")).sendKeys("https://www.fi.upm.es/");
	}


	@Test
	public void testClickBoton() throws Exception {
		driver.get("http://54.242.132.43/");
		driver.findElement(By.xpath("//button[@type='submit']")).click();
	}
	
	
	@Test
	  public void testFaltaUrl() throws Exception {
	    driver.get("http://54.242.132.43/");
	    driver.findElement(By.xpath("//div")).click();
	    driver.findElement(By.id("email")).click();
	    driver.findElement(By.xpath("//button[@type='submit']")).click();
	  }
	
	
	@Test
	  public void testFaltaEmail() throws Exception {
	    driver.get("http://54.242.132.43/");
	    driver.findElement(By.id("url")).click();
	    driver.findElement(By.id("url")).clear();
	    driver.findElement(By.id("url")).sendKeys("https://www.fi.upm.es/");
	    driver.findElement(By.xpath("//button[@type='submit']")).click();
	  }

	
	@Disabled
	@Test
	public void testTodosLosBotones() throws Exception {
		driver.get("http://54.242.132.43/");
		driver.findElement(By.xpath("//div")).click();
		driver.findElement(By.id("email")).clear();
		driver.findElement(By.id("email")).sendKeys("");
		driver.findElement(By.xpath("//body")).click();
		driver.findElement(By.id("url")).clear();
		driver.findElement(By.id("url")).sendKeys("");
		driver.findElement(By.id("email")).click();
		driver.findElement(By.id("email")).clear();
		driver.findElement(By.id("email")).sendKeys("prueba@alumnos.upm.es");
		driver.findElement(By.id("url")).click();
		driver.findElement(By.id("url")).clear();
		driver.findElement(By.id("url")).sendKeys("https://www.fi.upm.es/");
		assertThrows(NoSuchElementException.class,() -> driver.findElement(By.xpath("//button[@type='submit']")).click());
	}

	@AfterAll
	public static void tearDown() throws Exception {
		driver.quit();
		String verificationErrorString = verificationErrors.toString();
		if (!"".equals(verificationErrorString)) {
			fail(verificationErrorString);
		}
	}

	private boolean isElementPresent(By by) {
		try {
			driver.findElement(by);
			return true;
		} catch (NoSuchElementException e) {
			return false;
		}
	}

	private boolean isAlertPresent() {
		try {
			driver.switchTo().alert();
			return true;
		} catch (NoAlertPresentException e) {
			return false;
		}
	}

	private String closeAlertAndGetItsText() {
		try {
			Alert alert = driver.switchTo().alert();
			String alertText = alert.getText();
			if (acceptNextAlert) {
				alert.accept();
			} else {
				alert.dismiss();
			}
			return alertText;
		} finally {
			acceptNextAlert = true;
		}
	}
}
